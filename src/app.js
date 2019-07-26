const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

//define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs',{
        title: 'WEATHER',
        name: 'prince rathore'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about me',
        name: 'prince rathore'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'prince rathore',
        helpText: 'this is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error: error})
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'prince rathore',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'prince rathore',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => console.log('server running at port ' + port))
