const dotenv = require('dotenv')
dotenv.config()

const API_KEY = process.env.API_KEY

const weatherData = async (query) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`)

    if(!res.ok){
        throw new Error(`Couldn't get data!, status:${res.status}`);
    }
    const data = await res.json()

    return data
}

module.exports = { weatherData }