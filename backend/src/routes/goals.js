const express = require('express')
const Pyramid = require('../models/Pyramid')
const {
    getGoals,
    getGoal,
    createGoal,
    deleteGoal,
    updateGoal
} = require('../controllers/goalController')
const {generateResponse} = require('../services/openAIServices')

const router = express.Router()

router.get('/', getGoals)

router.get('/:id', getGoal)

router.post('/', generateResponse)

router.delete('/:id', deleteGoal)

router.patch('/:id', updateGoal)


module.exports = router