const {forecastData} = require('../services/forecast')

const forecastController = async (req, res)=>{
    try{
        const city = req.query.city

        if(!city) res.status(400).json({error: 'City input is required'})

        const data = await forecastData(city)
        res.json(data)
    }catch(error){
        res.status(500).json('server error')
    }
}

module.exports = {forecastController}