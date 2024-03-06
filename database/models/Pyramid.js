const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Definir el esquema de la meta (goal)
const phaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    tasks: [String]
});

const pyramidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    levels: [phaseSchema]
});

const Pyramid = mongoose.model('Pyramid', pyramidSchema);

module.exports = Pyramid;

