import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

//styles
import "../styles/pyramid.css";

//componentes
import TaskPopup from "../components/TaskPopup";

//ROUTER DOM
import { useParams } from "react-router-dom";

function Pyramid() {
  const ref = useRef();
  const [popupTask, setPopupTask] = useState(null);
  const [showTask, setShowTask] = useState(false);
  const [levelName, setlevelName] = useState(null);
  const [title, setTitle] = useState(null);

  const { formattedData } = useParams();
  const jsonData = JSON.parse(decodeURIComponent(formattedData));

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = createCamera();
    const { levels } = jsonData[0];

    const { renderer, labelRenderer } = setupRenderers();

    //TITULO

    setTitle(title);

    // Agregar luces a la escena
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direccional
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); // Luz puntual
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    const levelsParams = createPyramid(scene, levels);
    addInteractivity(scene, camera, levels, levelsParams);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y -= 0.0079;
        }
      });
      renderer.setClearColor(0xffffff);
      labelRenderer.render(scene, camera);
      renderer.render(scene, camera);
    };

    // Iniciar la animación
    animate();

    return () => {
      while (renderer.domElement.firstChild) {
        renderer.domElement.removeChild(renderer.domElement.firstChild);
      }
      while (labelRenderer.domElement.firstChild) {
        labelRenderer.domElement.removeChild(
          labelRenderer.domElement.firstChild
        );
      }
    };
  }, []);

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = -0.3;
    return camera;
  };

  const setupRenderers = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    document.body.appendChild(labelRenderer.domElement);

    return { renderer, labelRenderer };
  };

  const createPyramid = (scene, levelData) => {
    const material = new THREE.MeshStandardMaterial({
      color: 0xc5ebaa, // Color base verde menos intenso
      roughness: 0.001, // Rugosidad media
      metalness: 0.75, // Metálico medio
      transparent: true, // Permite transparencia
      opacity: 0.7,
      side: THREE.DoubleSide, // Renderizar ambas caras del material
    });

    let levelsParams = [
      {
        numLevels: 0,
        height: 0,
        totalHeight: 0,
      },
    ];

    let totalHeight = 0;

    for (let i = 0; i < levelData.length; i++) {
      let radiusTop = i < levelData.length - 1 ? 1 - 0.15 * i : 0.0;
      let radiusBottom = 1 - 0.15 * (i - 1);
      let height = 0.15;

      switch (levelData.length) {
        case 1:
          height = 0.7;
          break;
        case 2:
          height = i === levelData.length - 1 ? 0.8 : 0.18;
          radiusBottom = i === 0 ? 1 - 0.24 * (i - 1) : 1 - 0.1 * (i - 1);
          break;
        case 3:
          height = i === levelData.length - 1 ? 0.82 : 0.15;
          if (i === levelData.length - 1) radiusBottom = 1 - 0.16 * (i - 1);
          break;
        case 4:
          height = i === levelData.length - 1 ? 0.65 : 0.15;
          if (i === levelData.length - 1) radiusBottom = 1 - 0.16 * (i - 1);
          break;
        case 5:
          height = i === levelData.length - 1 ? 0.49 : 0.15;
          if (i === levelData.length - 1) radiusBottom = 1 - 0.158 * (i - 1);
          break;
        default:
          height = i === levelData.length - 1 ? 0.35 : 0.15;
          break;
      }

      const geometry = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        4
      );
      const level = new THREE.Mesh(geometry, material);

      level.position.y = totalHeight + height / 2 - 0.5;
      scene.add(level);
      level.userData = levelData[i];
      console.log(levelData[i]);
      totalHeight += height + 0.03;

      levelsParams.push({
        numLevels: levelData.length,
        height: height,
        totalHeight: totalHeight,
      });
    }
    return levelsParams;
  };

  const addInteractivity = (scene, camera, levelData, levelsParams) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const goalName = jsonData[0].name;
    const element = document.createElement("div");
    element.className = "title";
    element.textContent = goalName;
    const title = new CSS2DObject(element);
    scene.add(title);

    const onDocumentMouseInteraction = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      const labelsToRemove = scene.children.filter((child) => {
        return child instanceof CSS2DObject && child !== title;
      });

      labelsToRemove.forEach((label) => scene.remove(label));

      scene.children.forEach((child) => {
        if (child.userData.isHovered) {
          child.scale.set(1, 1, 1);
          child.material.color.setHex(0xc5ebaa);
          child.userData.isHovered = false;
        }
      });

      if (intersects.length > 0) {
        const object = intersects[0].object;
        const userData = object.userData;

        if (event.type === "mousedown") {
          setPopupTask(userData.tasks);
          setShowTask(true);
          setlevelName(userData.name);
          console.log(userData.name);
        } else if (event.type === "mousemove") {
          const element = document.createElement("div");
          element.className = "label";
          element.textContent = userData.name;
          const label = new CSS2DObject(element);
          let posY = 0;

          for (var j = 0; j < levelsParams.length; j++) {
            if (userData.name === levelData[j].name) {
              posY =
                levelsParams[j].totalHeight + levelsParams[j].height / 2 - 0.4;
              break;
            }
          }

          label.position.set(2 - 0.1 * j, posY, 0);
          scene.add(label);

          object.scale.set(1.05, 1, 1.05); // Agrandar el objeto
          object.material.color.setHex(0x49e795); // Cambiar el color
          object.userData.isHovered = true;
          object.userData.originalColor = object.material.color.getHex();
        }
      }
    };

    document.addEventListener("mousemove", onDocumentMouseInteraction, false);
    document.addEventListener("mousedown", onDocumentMouseInteraction, false);

    // Función de limpieza
    return () => {
      document.removeEventListener("mousemove", onDocumentMouseInteraction);
      document.removeEventListener("mousedown", onDocumentMouseInteraction);
    };
  };

  return (
    <div>
      <div ref={ref} />
      {popupTask && showTask && (
        <TaskPopup
          name={levelName}
          tasks={popupTask}
          closePopup={() => {
            setShowTask(false);
          }}
        />
      )}
    </div>
  );
}

export default Pyramid;
