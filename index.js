// Vars
const key = "901280234eaf7bf09a3fe10472e067e6";
var submit = document.querySelector('#form');
var query = document.querySelector('#city');
var localHistory = [];


//Date

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${month}/${day}/${year}`;



const getWeather = async (event) => {
    event.preventDefault();
    stored(query)
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
    renderFive(data)
  }


const renderToday = (weather) => {
  var today = document.querySelector('#today')
  today.innerHTML = ""
  today.removeAttribute('hidden')
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

const renderFive = (data) => {
  for (var i = 0; i < 5; i++) {

    var forecast = document.querySelector(`#day${i}`)
    forecast.innerHTML = ""
    forecast.removeAttribute('hidden')

    var date = data.list[i].dt_txt
    var temp = data.list[i].main.temp
    var wind = data.list[i].wind.speed
    var humidity = data.list[i].main.humidity
    var icon = data.list[i].weather[0].icon
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + (1 + i));

    var datePrint = document.createElement('p')
    var tempPrint = document.createElement('p')
    var windPrint = document.createElement('p')
    var humidityPrint = document.createElement('p')
    var iconPrint = document.createElement('img');
    var iconSRC =  `https://openweathermap.org/img/wn/${icon}@2x.png`  
    iconPrint.setAttribute('src', iconSRC)

    datePrint.textContent = tomorrow.toDateString()  
    tempPrint.textContent = `Temp: ${temp}°F`
    windPrint.textContent = `Wind speed: ${wind} MPH`
    humidityPrint.textContent = `Humidity: ${humidity}%`
    
    forecast.append(datePrint,iconPrint,tempPrint, windPrint,humidityPrint)
  }
}

const stored = (query) => {
  if (localHistory.includes(query.value)){
    return
  } else {
  localHistory.push(query.value);
  localStorage.setItem('history', JSON.stringify(localHistory));
}}

const renderHistory = () => {
  var render = document.querySelector("#history")
  render.innerHTML = "";
  localHistory.forEach((search) => {
    render.innerHTML = "<option>" + render.innerHTML;
    render.querySelector("option").innerText = search;
  });
};

const localInit = () =>{
  var storageHistory = localStorage.getItem('history')
  if (storageHistory) {
    localHistory = JSON.parse(storageHistory)}
    console.log(localHistory)
  }

localInit()
submit.addEventListener('submit', getWeather)

query.addEventListener('focus', renderHistory)