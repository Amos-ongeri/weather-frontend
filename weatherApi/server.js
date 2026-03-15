const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const weatherRoute = require('./routes/weatherRoute')
const currentLocation = require('./routes/locationRoute')
const forecast = require('./routes/forecastRoute')
const geoRoute = require('./routes/geolocationRoute')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/weather', weatherRoute)
app.use('/api/current', currentLocation)
app.use('/api/forecast', forecast)
app.use('/api/geolocation', geoRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})