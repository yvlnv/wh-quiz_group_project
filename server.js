const express = require('express')
const expressHandlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()
const { sequelize } = require('./models')
const quiz = require('./quiz')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// [START get requests]

app.get('/', (req, res) => {
    res.render('landing_page')
})

app.get('/instructions', (req, res) => {
    res.render('instructions')
})

app.get('/quiz', (req, res) => {
    const question = quiz.questions[0].question
    const question_id = quiz.questions[0].id
    const answers = quiz.questions[0].answers
    // correct_answer is currently hardcoded 
    // to show answer for the first question
    const correct_answer = quiz.correct_answers.q1
    res.render('quiz', { question, answers, correct_answer })
})

app.get('/summary', (req, res) => {
    res.render('summary')
})

// [END get requests]

// [START post requests]

app.post('/submit', (req, res) => {
    // currently hardcoded to true
    res.json({ is_correct: true })
})

app.post('/next', (req, res) => {
    const next_question = quiz.questions[1].question
    const answers = quiz.questions[1].answers
    const correct_answer = quiz.correct_answers.q2
    res.json({ next_question: next_question, next_answers: answers, correct_answer: correct_answer })
})
// [END post requests]

app.listen(3000, async () => {
    await sequelize.sync()
    console.log('Web server is running')
})