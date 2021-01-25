import React, {useEffect, useState, useRef} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

function Main() {
    const [currentWeather, setCurrentWeather] = useState()
    const [dailyWeather, setDailyWeather] = useState()
    const [date, setDate] = useState()
    const locationSearchRef = useRef()

    //set variable equal to storage value
    // const activeID = JSON.parse(window.localStorage.getItem(typeID));
    //set window storage
    // window.localStorage.setItem(typeID, JSON.stringify(setID));

    function handleLocationSearch() {
        window.localStorage.setItem('location', locationSearchRef.current.value)
    }

    function dateYear(dateNumber){
        const date = new Date(dateNumber*1000)
        return date.getFullYear()
    }

    function dateDate(dateNumer){
        const date = new Date(dateNumer*1000)
        return date.getDate()
    }

    function dateTime(dateNumber){
        const date = new Date(dateNumber*1000)
        let minutes = date.getMinutes()
        let hours = date.getHours()
        let twelveHour = ''

        if (hours === 12){
            twelveHour = 'PM'
        }else if(hours < 12){
            twelveHour = 'AM'
            if (hours === 0){
                hours = 12
            }
        }else{
            hours = hours -12
            twelveHour = 'PM'
        };

        let time = '';

        if (minutes === 0){
            time = hours + ':00 '+ twelveHour
        }else if (minutes < 10){
            time = hours + ':0' + minutes + ' ' + twelveHour
        }else{
            time = hours + ':' + minutes + ' ' + twelveHour
        }

        return time
    }

    function dateWeekday(dateNumber){
        const date = new Date(dateNumber*1000)
        let weekday = ''
        switch (date.getDay()){
            case 0:
                weekday =  'Sun'
                break;
            case 1:
                weekday = 'Mon'
                break;
            case 2:
                weekday =  'Tue'
                break;
            case 3:
                weekday =  'Wed'
                break;
            case 4:
                weekday =  'Thu'
                break;
            case 5:
                weekday =  'Fri'
                break;
            case 6:
                weekday =  'Sat'
                break;
            default:
                weekday = 'Problem reading the weekday.'
        }

        return weekday
    }

    function dateMonth(dateNumber){
        const date = new Date(dateNumber*1000)
        let month = ''
        switch (date.getMonth()) {
            case 0:
                month =  'Jan'
                break;
            case 1:
                month =  'Feb'
                break;
            case 2:
                month =  'Mar'
                break;
            case 3:
                month =  'Apr'
                break;
            case 4:
                month =  'May'
                break;
            case 5:
                month =  'Jun'
                break;
            case 6:
                month =  'Jul'
                break;
            case 7:
                month =  'Aug'
                break;
            case 8:
                month =  'Sep'
                break;
            case 9:
                month =  'Oct'
                break;
            case 10:
                month =  'Nov'
                break;
            case 11:
                month =  'Dec'
                break;
            default:
                month = 'Problem reading the month.'
        }
        return month
    }

    useEffect(()=>{
    let locationWeatherSearch = '';
    if (window.localStorage.getItem('location')){
        locationWeatherSearch = window.localStorage.getItem('location');
    }else{
        locationWeatherSearch = 'Toronto';
        window.localStorage.setItem('location', 'Toronto')
    }

    axios.post('/weather/getLocationWeather', {location:locationWeatherSearch})
        .then(response =>{
            console.log(response.data)
            setCurrentWeather(response.data.current)
            setDate(response.data.current.dt)
            setDailyWeather(response.data.daily)
        })
        .catch(err => console.log(err));

    }, []);

    return (
        <div className='weatherDiv'>
            <Container>
                <form onSubmit={handleLocationSearch} >
                    <div className='row searchDiv'>
                        <div className='col-md-3 websiteTitleDiv' >
                            <h4 className='websiteTitle'>Search4Weather</h4>
                        </div>
                        <div className='col-md-7 searchInputDiv'>
                            <input placeholder='Search for weather in your area' id='locationSearch' className='form-control locationSearchInput' ref={locationSearchRef}></input>
                        </div>
                        <div className='col-md-2 searchButtonDiv'>
                            <button className='searchButton' type='submit'>Search</button>
                        </div>
                    </div>
                </form>
                {currentWeather &&
                    <div className='cardDiv'>
                        {window.localStorage.getItem('location') && 
                            <h4>{window.localStorage.getItem('location')}</h4>
                        }
                        <h4>
                            {dateWeekday(date)} {dateMonth(date)} {dateDate(date)}, {dateYear(date)}
                        </h4>
                        <img src={'http://openweathermap.org/img/wn/' + currentWeather.weather[0].icon + '@2x.png'} alt='Weather Icon'></img>
                        <h2> {currentWeather.temp} °C</h2>
                        <h2>Feels like {currentWeather.feels_like} °C</h2>
                        <div className='sun'></div>
                        <h5><i className="far fa-sun"></i><i className="far fa-arrow-alt-circle-up"></i> {dateTime(currentWeather.sunrise)} / {dateTime(currentWeather.sunset)} <i className="far fa-sun"></i><i className="far fa-arrow-alt-circle-down"></i> </h5>
                        <h5>As of {dateTime(date)}</h5>
                    </div>
                }
                {dailyWeather && 
                    <div className='carouselDiv'>
                        <Carousel>
                            {dailyWeather.map((day,index) =>
                                index !== 0 && 
                                <Carousel.Item key={index} interval={5000}>
                                        <div className='carouselTextDiv'>
                                            <h4>
                                                {dateWeekday(day.dt)} {dateMonth(day.dt)} {dateDate(day.dt)}, {dateYear(day.dt)}
                                            </h4>
                                            <img src={'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'} alt='Weather Icon'></img>
                                            <h5><i className="far fa-sun"></i> {day.temp.day} °C / {day.temp.night} °C <i className="far fa-moon"></i></h5>
                                        </div>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                }
            </Container>
        </div>
    );
}

export default Main;