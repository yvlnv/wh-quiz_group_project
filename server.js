const express = require('express')
const expressHandlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()
const { sequelize } = require('./models')
const quiz = require('./quiz')
const bodyParser = require('body-parser');


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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
    const answers = quiz.questions[0].answers
    res.render('quiz', { question, answers })
})

app.get('/summary', (req, res) => {
    const score = 24
    //hardcoded example
    res.render('summary', { score })
})

// [END get requests]

// [START post requests]

app.post('/submit', (req, res) => {
    // currently hardcoded to true
    res.json({ is_correct: true })
})

app.post('/next', (req, res) => {
    const current_question = req.body.current_question
    const next_question = quiz.questions[current_question - 1].question
    const answers = quiz.questions[current_question - 1].answers
    res.json({ next_question: next_question, next_answers: answers })
})
// [END post requests]

app.listen(3000, async () => {
    await sequelize.sync()
    console.log('Web server is running')
})