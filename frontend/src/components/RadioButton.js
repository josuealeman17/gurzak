import React from "react";
import '../styles/form.css'

const RadioButton = ({ id, name, value, submit, onChange }) => {
  return (
    <div className="input-container">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={submit}
      />
      <div className="radio-tile">
        <label htmlFor="1">
          {id}. {value}.
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
