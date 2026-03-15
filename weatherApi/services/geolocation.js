const maxmind = require('maxmind')

const geo = async (ip)=>{
    lookup = await maxmind.open('./geo/GeoLite2-City.mmdb')

    geoData = lookup.get(ip)

    return geoData

}

module.exports ={geo}