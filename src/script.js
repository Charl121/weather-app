function showTime(day, time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  new Date();
  let now = new Date();

  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = now.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  let showTime = `${currentDay}  ${currentHour}: ${currentMin}`;
  return showTime;
}

function displayCityWeather(response) {
  document.querySelector("#current-city").innerHTML= response.data.name;
  let currentTemperature = document.querySelector("#current-temp").innerHTML=`${Math.round(response.data.main.temp)} °C` ;
  let currentHumidity= document.querySelector(".humidity").innerHTML=`Humidity: ${Math.round(response.data.main.humidity)}%`;
  let currentWind= document.querySelector(".wind").innerHTML=`Wind: ${Math.round(response.data.wind.speed)} m/s`;
  let currentDescription= document.querySelector(".description").innerHTML=response.data.weather[0].main;

}
 

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  let key = "51788e8922b028b9bd5474e029ff8729";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayCityWeather);
}

function searchLocation (position) {
  let key = "51788e8922b028b9bd5474e029ff8729";
  let url= `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  
   axios.get(url).then(displayCityWeather);
}

function showCurrentLocation (event){
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
  }

let h3 = document.querySelector("#current-time");
h3.innerHTML = showTime();

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

let currentLocationButton=document.querySelector(".currentLocationButton");
currentLocationButton.addEventListener("click", showCurrentLocation);