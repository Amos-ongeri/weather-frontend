const { currentLocation } = require('../services/locationData')

const locationController = async (req, res)=>{
    const { lat, lon} = req.query

    try{
        const data = await currentLocation(lat, lon)
        res.json(data)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {locationController}