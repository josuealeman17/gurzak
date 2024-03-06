import React from "react";
import "../styles/form.css";

//components
import RadioButton from "./RadioButton"; // Asume que tienes un componente RadioButton

const GoalStatusForm = ({
  submit,
  title,
  options,
  name,
  handleRadioChange,
  handleSubmit,
}) => {
  return (
    <div className="radio-tile-group">
      <h1>{title}</h1>
      <form className="form-container">
        {options.map((option) => (
          <div className="input-container" key={option.id}>
            <RadioButton
              id={option.id}
              name={name}
              value={option.value}
              submit={submit}
              onChange={handleRadioChange}
            />
          </div>
        ))}
        {submit && <button onClick={handleSubmit}>Agregar meta</button>}
      </form>
    </div>
  );
};

export default GoalStatusForm;
