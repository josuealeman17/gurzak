export const validateForm = (formData) => {
  
  if (!formData.goalName && !formData.goalType && !formData.goalDuration) {
    return "Todos los campos son obligatorios";
  }

  if (!formData.goalType) {
    return "Por favor, selecciona el tipo de meta"
  }
  if (!formData.goalName) {
    return "Por favor, describir la meta que desea lograr"
  }
  if (!formData.goalDuration) {
    return "Por favor, selecciona la duracion de su meta"
  }

  if (!/^[a-zA-Z\s]+$/.test(formData.goalName)) {
    return "El nombre de la meta solo puede contener letras y espacios";
  }
  
  return null;
};
