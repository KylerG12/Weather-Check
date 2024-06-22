// Vars
const key = "901280234eaf7bf09a3fe10472e067e6";
var submit = document.querySelector('#form');
var query = document.querySelector('#city');



const getWeather = async (event) => {
    event.preventDefault();
    console.log("runzorz", event)
    const cityName = query.value;
    var city = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
    const response = await fetch(city);
    const weather = await response.json();
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${key}`

    const fiveDay = await fetch(api)
    const data = await fiveDay.json();
    console.log(data)
  }

submit.addEventListener('submit', getWeather)
