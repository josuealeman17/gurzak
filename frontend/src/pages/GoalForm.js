import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoalsContext } from "../hooks/useGoalsContext";

const GoalForm = () => {

  const { dispatch } = useGoalsContext();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    goalName: "",
    goalType: "",
    goalDuration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
      console.log(json.message);

      if (response.ok) {
        dispatch({ type: "CREATE_GOAL", payload: json }); //funcion que actualiza automaticamente el estado de las metas sin necesidad de hacer F5
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>Selecciona el tipo de meta:</h2>
            <select name="goalType" onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Salud">Salud</option>
              <option value="Relaciones">Relaciones</option>
              <option value="Espiritualidad">Espiritualidad</option>
              <option value="Academico">Académico</option>
            </select>
            <button onClick={() => setStep(step + 1)}>Siguiente</button>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>¿Qué deseas lograr?</h2>
            <input
              type="text"
              name="goalName"
              value={formData.goalName}
              onChange={handleChange}
            />
            <button onClick={() => setStep(step + 1)}>Siguiente</button>
          </div>
        );
      case 2:
        return (
          <div>
            {/* Opción multiple: 4 meses, 6 meses, 8 meses, 12 meses, 24, meses, 36 meses, 48 meses */}
            <h2>¿En cuanto tiempo deseas lograrlo?</h2>
            <select name="goalDuration" onChange={handleChange}>
              <option value="">Selecciona una opción</option>
              <option value="4">4 meses</option>
              <option value="6">6 meses</option>
              <option value="8">8 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
              <option value="48">48 meses</option>
            </select>
            <button onClick={handleSubmit}>Agregar meta</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="goal-form">
      <h1>Formulario de Meta</h1>
      {renderForm()}
    </div>
  );
};

export default GoalForm;
