import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/* import { useForm } from "react-hook-form"; // Importa useForm desde react-hook-form */

//hooks
import { useGoalsContext } from "../hooks/useGoalsContext";

//components
import GoalStatusForm from "../components/GoalStatusForm";

//styles
import '../../src/index.css'

const GoalForm = () => {
  const { dispatch } = useGoalsContext();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    goalName: "",
    goalStatus: "",
    goalVision: "",
    goalDuration: "",
    goalPriorities: "",
    goalResources: "",
    goalCommitment: "",
  });
  const [error, setError] = useState("");

  const handleNextStep = () => {
    if (formData.goalName.trim() === "") {
      setError(
        "Como podemos ayudarte, si no sabemos lo que quieres? Llena el campo"
      );
    } else {
      setError("");
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    navigate("/");
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      console.log(json);
      console.log("goal not ok");
      if (response.ok) {
        dispatch({ type: "CREATE_GOAL", payload: json });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStep(step + 1);
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="input-box">
            <span>¿Qué meta planeas conquistar?</span>
            <input
              type="text"
              name="goalName"
              value={formData.goalName}
              required="required"
              placeholder="Escribe tu meta aquí"
              onChange={handleTextChange}
            ></input>

            {error && <p className="error-message">{error}</p>}
            <button onClick={handleNextStep}>Continuar</button>
          </div>
        );
      case 1:
        const statusOptions = [
          {
            id: "a",
            value: "Estoy en las etapas iniciales, aun no he comenzado",
          },
          {
            id: "b",
            value: "He dado algunos pasos, pero todavía estoy aprendiendo",
          },
          {
            id: "c",
            value: "Ya tengo experiencia, pero busco mejorar y avanzar",
          },
          {
            id: "d",
            value:
              "He alcanzado cierto nivel, pero quiero llevarlo al siguiente nivel",
          },
          {
            id: "e",
            value:
              "He llegado bastante lejos, pero necesito un impulso adicional para alcanzar mi objetivo",
          },
        ];

        return (
          <GoalStatusForm
            submit={false}
            title="¿Dónde te encuentras actualmente en relación con tu meta?"
            options={statusOptions}
            name="goalStatus"
            handleRadioChange={handleRadioChange}
          />
        );

      case 2:
        const visionOption = [
          {
            id: "a",
            value: "Quiero establecer una base sólida para mis habilidades",
          },
          { id: "b", value: "Aspiro a dominar completamente este campo" },
          {
            id: "c",
            value: "Deseo aplicar mis habilidades en un entorno profesional",
          },
          { id: "d", value: "Busco contribuir al avance de esta área" },
          {
            id: "e",
            value: "Quiero convertirme en un experto reconocido en este campo",
          },
        ];

        return (
          <GoalStatusForm
            submit={false}
            title="¿Hacia dónde quieres dirigirte con tu meta?"
            options={visionOption}
            name="goalVision"
            handleRadioChange={handleRadioChange}
          />
        );

      case 3:
        const deadlineOption = [
          { id: "a", value: "Dentro de los próximos 3 meses" },
          { id: "b", value: "De 3 a 6 meses" },
          { id: "c", value: "De 6 meses a 1 año" },
          { id: "d", value: "De 1 a 2 años" },
          { id: "e", value: "De 2 a 5 años" },
          { id: "f", value: "De 5 a 10 años" },
          {
            id: "g",
            value:
              "No tengo un plazo definido, estoy dispuesto a tomarme el tiempo necesario.",
          },
        ];
        return (
          <GoalStatusForm
            submit={false}
            title="¿Cuál es tu plazo para alcanzar tu meta?"
            options={deadlineOption}
            name="goalDuration"
            handleRadioChange={handleRadioChange}
          />
        );

      case 4:
        const prioritiesOption = [
          { id: "a", value: "Establecer una base sólida de conocimientos." },
          {
            id: "b",
            value: "Desarrollar habilidades específicas y avanzadas.",
          },
          {
            id: "c",
            value: "Obtener experiencia práctica y aplicar lo aprendido.",
          },
          {
            id: "d",
            value: "Buscar oportunidades de crecimiento y avance profesional.",
          },
          {
            id: "e",
            value:
              "Equilibrar mi aprendizaje con otros aspectos de mi vida personal y profesional.",
          },
        ];

        return (
          <GoalStatusForm
            submit={false}
            title="¿Cuáles son tus prioridades en este momento?"
            options={prioritiesOption}
            name="goalPriorities"
            handleRadioChange={handleRadioChange}
          />
        );

      case 5:
        const resourcesOption = [
          {
            id: "a",
            value: "Tiempo dedicado diariamente para practicar y aprender.",
          },
          {
            id: "b",
            value:
              "Recursos financieros para cursos, materiales de estudio, etc.",
          },
          {
            id: "c",
            value:
              "Participación en eventos, conferencias o grupos de estudio.",
          },
          {
            id: "d",
            value:
              "Colaboración con otros profesionales o mentores en el campo.",
          },
          {
            id: "e",
            value:
              "Adaptación de mi estilo de vida para centrarme en mi objetivo.",
          },
        ];

        return (
          <GoalStatusForm
            submit={false}
            title="¿Qué recursos estás dispuesto a invertir en tu meta?"
            options={resourcesOption}
            name="goalResources"
            handleRadioChange={handleRadioChange}
          />
        );

      case 6:
        const willingnessOption = [{ id: "a", value: "Si" }];

        return (
          <GoalStatusForm
            submit={true}
            title="Por último… ¿Estás dispuesto a conseguirlo, a pesar de todas las dificultades?"
            options={willingnessOption}
            name="goalCommitment"
            handleRadioChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <h1>Let's get started.</h1>
      {renderForm()}
    </div>
  );
};

export default GoalForm;
