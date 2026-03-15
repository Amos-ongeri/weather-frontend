const { weatherData } = require('../services/weather')

const weatherController = async (req, res) => {
    try{
        const city =req.query.city

        if(!city) res.status(400).json({error: 'City input is required'})
            
        const data = await weatherData(city)

        res.json(data)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = { weatherController }