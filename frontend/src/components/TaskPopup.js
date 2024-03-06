import React from "react";
import "../styles/pyramid.css";

const TaskPopup = ({ name, tasks, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>{name}</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>

        <button onClick={closePopup} className="close-button">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TaskPopup;
