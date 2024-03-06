const openAI = require("openai");
const { createGoal } = require("../controllers/goalController");

const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResponse = async (req, res) => {
  const {
    goalName,
    goalStatus,
    goalVision,
    goalDuration,
    goalPriorities,
    goalResources,
    goalCommitment,
  } = req.body;

  const typePropmt = `En base a la siguiente meta: "${goalName}". Clasificala en un area especifica. Por ejemplo: Academico, Relaciones Interpersonales, Inteligencia Emocional, Negocios, Espiritualidad, Salud, etc. No me des texto extra, solo devuelveme la palabra (area).`
  const goalPrompt = `${goalName}. ${goalStatus}. ${goalVision}. El plazo para alcanzar mi meta es ${goalDuration}. Mi prioridad es ${goalPriorities}, con ${goalResources}. Plan estructurado en metas, fases y tareas. Fases ajustables según complejidad y tiempo disponible. Cada fase tiene su nombre caracteristico(name), tiempo estimado(duration) y tareas específicas clave para alcanzar la meta, las (tasks). Genera un JSON  de levels[]: name (con un nombre caracteristico de acuerdo a las tareas), duration, tasks[]. No me des texto extra, unicamente dame el .json`;

  try {
    
    const responseZero = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: typePropmt}],
      max_tokens: 200,
    });
    const goalType = responseZero.choices[0].message.content.trim();

    const responseOne = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: goalPrompt }],
      max_tokens: 1000,
    });
    const jsonResponse = JSON.parse(responseOne.choices[0].message.content.trim());
    const levels = jsonResponse.levels;

    await createGoal({
      name: goalName,
      type: goalType,
      duration: goalDuration,
      levels: levels,
    });

    res.status(200).json({ message: "Goal created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateResponse,
};
