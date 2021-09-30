const express = require('express')
const expressHandlebars = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {Quiz, sequelize} = require('./models')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('landing_page')
})

app.get('/instructions', (req, res) => {
    res.render('instructions')
})

app.get('/quiz', (req, res) => {
    res.render('quiz')
})

app.get('/summary', (req, res) => {
    res.render('summary')
})

app.listen(3000, async () => {
    await sequelize.sync()
    console.log('Web server is running')
})