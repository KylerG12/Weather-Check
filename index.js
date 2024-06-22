// Vars
var cityName = "London";
const key = "901280234eaf7bf09a3fe10472e067e6";
// let lat
// let lon
// const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
var city = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;



const getWeather = async () => {
    const response = await fetch(city);
    const weather = await response.json();
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`

    const fiveDay = await fetch(api)
    const data = await fiveDay.json();
    console.log(data)
  }


// getWeather();