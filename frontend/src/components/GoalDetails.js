import React, { useState } from "react";
import { useGoalsContext } from "../hooks/useGoalsContext";

const GoalDetails = ({ goal }) => {

  const {dispatch} = useGoalsContext()

  const [showPhases, setShowPhases] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);

  const toggleShowPhases = () => {
    setShowPhases(!showPhases);
    setSelectedPhase(null);
  };

  const togglePhase = (index) => {
    if (selectedPhase === index) {
      setSelectedPhase(null);
    } else {
      setSelectedPhase(index);
    }
  };

  const handleClick = async () => {
    const response = await fetch('api/goals/' + goal._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_GOAL', payload: json})
    }
  }

  return (
    <div className="goals-details">
      <h4>{goal.name}</h4>
      <p>
        <strong>Tipo de meta:</strong> {goal.type}
      </p>
      <p>
        <strong>Tiempo estimado:</strong> {goal.duration}
      </p>
      <button onClick={toggleShowPhases}>
        {showPhases ? "Ocultar Piramde" : "Mostrar Piramide"}
      </button>
      {showPhases && (
        <div>
          {goal.levels
            .slice()
            .reverse()
            .map((phase, index) => (
              <div key={index} className="phase">
                <h5 onClick={() => togglePhase(goal.levels.length - index - 1)}>
                  {phase.name}
                </h5>
                {selectedPhase === goal.levels.length - index - 1 && (
                  <div>
                    <p>
                      <strong>Duración:</strong> {phase.duration} meses
                    </p>
                    <h6>Tareas:</h6>
                    <ul>
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default GoalDetails;
