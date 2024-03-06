const Pyramid = require("../models/Pyramid");
const mongoose = require("mongoose");

//get all goals

const getGoals = async (req, res) => {
  const goals = await Pyramid.find({}).sort({ createdAt: -1 });

  res.status(200).json(goals);
};

//get a single goal
const getGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such goal" });
  }

  const goal = await Pyramid.findById(id);

  if (!goal) {
    return res.status(404).json({ error: "No such goal" });
  }

  res.status(200).json(goal);
};

//create a new goal

const createGoal = async ({ name, type, duration, levels }) => {


  let emptyFields = [] 

  if(!name) {
    emptyFields.push('name')
  } 

  if(!type) {
    emptyFields.push('type')
  }

  if(!duration) {
    emptyFields.push('duration')
  }

  if(!levels) {
    emptyFields.push('levels')
  }
  
  if(emptyFields.length > 0) {
    return res.status(400).json({error: "No podremos ayudarte si no sabemos lo que quieres. Por favo llena este campo!"})
  }

  try {
    const pyramid = await Pyramid.create({
      name: name,
      type: type,
      duration: duration,
      levels: levels,
    });
    return pyramid;
  } catch (error) {
    throw error;
  }
};

//delete a goal

const deleteGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such goal" });
  }

  const goal = await Pyramid.findOneAndDelete({ _id: id });

  if (!goal) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(goal);
};

//update a goal

const updateGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such goal" });
  }

  const goal = await Pyramid.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!goal) {
    return res.status(400).json({ error: "No such goal" });
  }

  res.status(200).json(goal);
};

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};
