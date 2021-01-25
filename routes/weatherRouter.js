const express = require('express');
const router = express.Router();
const axios = require('axios');
//weather api doc link https://openweathermap.org/api/one-call-api
// location api doc link https://positionstack.com/documentation

router.post(('/test'),(req,res)=>{
    console.log(req.body);
    res.json('hello test!')
});

//weather and location for app
router.route('/getLocationWeather').post((req,res)=>{

    const weatherAPICall = async (lat,lon) => {
        const weatherKey = process.env.WEATHERAPIKEY
        const weatherAPIURL = "https://api.openweathermap.org/data/2.5/onecall?&units=metric&lat="+lat+"&lon="+lon+"&appid="+weatherKey;
        const weather = await axios.get(weatherAPIURL)
        return weather.data
    }
    
    const locationAPICall = async () => {
        const locationKey = process.env.LOCATIONAPIKEY
        const location = req.body.location
        const locationAPIURL = "http://api.positionstack.com/v1/forward?access_key="+locationKey+"&query="+location
        const coordinates = await axios.get(locationAPIURL)
        return coordinates.data
    }

    locationAPICall()
        .then(coordinates =>{
            weatherAPICall(coordinates.data[0].latitude,coordinates.data[0].longitude)
                .then(weather => { 
                    const current = weather.current
                    const daily = weather.daily
                    const hourly = weather.hourly
                    const weatherInfo = {
                        current,
                        hourly,
                        daily
                    }
                    res.json(weatherInfo)
                    // console.log(weather.current)
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

//weather
router.route('/getWeather').get((req,res)=>{

    const weatherAPICall = async () => {
        const weatherKey = process.env.WEATHERAPIKEY
        const weatherAPIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=42.9935&lon=-79.2281&appid="+weatherKey;
        const weather = await axios.get(weatherAPIURL)
        return weather.data
    }
    
    weatherAPICall()
        .then(data => { 
            res.json(data.current)
        })
        .catch(err => console.log(err));
});

//location
router.route('/getLocation').get((req,res) =>{

    const locationAPICall = async () => {
        const locationKey = process.env.LOCATIONAPIKEY
        const location = req.body.location
        const locationAPIURL = "http://api.positionstack.com/v1/forward?access_key="+locationKey+"&query="+location
        const coordinates = await axios.get(locationAPIURL)
        return coordinates.data
    }

    locationAPICall()
        .then(data =>{
            res.json(data)
        })
        .catch(err => console.log(err));

});

module.exports = router;