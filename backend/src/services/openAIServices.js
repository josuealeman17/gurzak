const openAI = require("openai");
const { createGoal } = require("../controllers/goalController");

const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResponse = async (req, res) => {

  const { goalName, goalType, goalDuration } = req.body;
  const userPrompt = `Objetivo: ${goalName}, Duracion: ${goalDuration} meses. Plan estructurado en metas, fases y tareas. Fases ajustables según complejidad y tiempo disponible. Cada fase tiene su nombre caracteristico(name), tiempo estimado(duration tipo NUMBER) y tareas específicas las(tasks). Genera un JSON  de levels[]: nombre, duración, tareas[]. No me des texto extra, unicamente dame el .json`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userPrompt }],
      max_tokens: 1000,
    });

    const jsonResponse = JSON.parse(response.choices[0].message.content.trim());
    const levels = jsonResponse.levels;

    await createGoal({
      name: goalName,
      type: goalType,
      duration: goalDuration,
      levels: levels,
    });

    /* console.log(response.choices[0].message.content.trim()); */
    res.status(200).json({ message: "Goal created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateResponse
};
