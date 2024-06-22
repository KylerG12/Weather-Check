// Vars
const key = "901280234eaf7bf09a3fe10472e067e6";
var submit = document.querySelector('#form');
var query = document.querySelector('#city');

//Date

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${month}/${day}/${year}`;



const getWeather = async (event) => {
    event.preventDefault();
    const cityName = query.value;
    var city = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${key}`
    const response = await fetch(city);
    const weather = await response.json();
    console.log("today", weather)
    renderToday(weather)
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${key}`

    const fiveDay = await fetch(api)
    const data = await fiveDay.json();
    console.log(data)
  }

submit.addEventListener('submit', getWeather)

const renderToday = (weather) => {
  var today = document.querySelector('#today')
  today.innerHTML = ""
  var city = weather.name
  var temp = weather.main.temp
  var wind = weather.wind.speed
  var humidity = weather.main.humidity
  var icon = weather.weather[0].icon


  var cityPrint = document.createElement('p')
  var tempPrint = document.createElement('p')
  var windPrint = document.createElement('p')
  var humidityPrint = document.createElement('p')
  var iconPrint = document.createElement('img');
  var iconSRC =  `https://openweathermap.org/img/wn/${icon}@2x.png`  
  iconPrint.setAttribute('src', iconSRC)
  
  
  cityPrint.textContent = city
  cityPrint.appendChild(iconPrint)
  tempPrint.textContent = `Current temp: ${temp}°F`
  windPrint.textContent = `Current wind speed: ${wind} MPH`
  humidityPrint.textContent = `Current humidity: ${humidity}%`
  today.append(currentDate,cityPrint,tempPrint, windPrint, humidityPrint)
}
