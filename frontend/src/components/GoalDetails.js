import React from "react";
import { useGoalsContext } from "../hooks/useGoalsContext";
import { useNavigate } from "react-router-dom";

const GoalDetails = ({ goal }) => {
  const { dispatch } = useGoalsContext();

  const navigate = useNavigate();


  const getGoalData = async () => {
    try {
      const response = await fetch("api/goals/" + goal._id, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const json = await response.json();
      const formattedData = [
        {
          _id: json._id,
          name: json.name,
          type: json.type,
          duration: json.duration,
          levels: json.levels.map((level) => ({
            name: level.name,
            duration: level.duration,
            tasks: level.tasks,
            _id: level._id,
          })),
        },
      ];

      navigate(`/show-goal/${encodeURIComponent(JSON.stringify(formattedData))}`);

    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    const response = await fetch("api/goals/" + goal._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GOAL", payload: json });
    }
  };

  return (
    <div className="goals-details">
      <h4>{goal.name}</h4>
      <p>
        <strong>Tipo de meta:</strong> {goal.type}
      </p>
      <p>
        <strong>Tiempo estimado:</strong> {goal.duration}
      </p>
      <br />
      <button onClick={getGoalData}>Ver meta</button>

      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default GoalDetails;
