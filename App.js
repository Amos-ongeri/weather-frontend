const BACKEND = "https://weather-server-side.onrender.com";

const weatherContainer = document.querySelector('#weather-container')
const forecastContainer = document.querySelector('#forecast')
const content = document.querySelector('#content')
const loading = document.querySelector('#loading')
const connectionError = document.querySelector('#connection-error')
const reload = document.querySelector('#reload')

const GeoLocation = async ()=>{
  //current location
  try{
    const geoRes = await fetch(`${BACKEND}/api/geolocation`)

    if(!geoRes.ok){
        throw new Error("an error occurred");
    }

    const geoData = await geoRes.json()
    console.log('geolocation: ', geoData);
    return geoData

  }catch(error){
    console.log(error.message);
  }
}

const searching = async (city)=>{
  try{
    loading.style.display = 'block';
    content.style.display = 'none';
    //weather data by search
    const searchRes = await fetch(`${BACKEND}/api/weather?city=${city}`);

    if(!searchRes.ok) alert('something went wrong, please enter a valid city name')

    //forecast data
    const forecastRes = await fetch(`${BACKEND}/api/forecast?city=${city}`)

    if(!forecastRes.ok) throw new Error("couldn't fetch data");

    const forecastData = await forecastRes.json()

    console.log('forecast:', forecastData);

    const searchData = await searchRes.json()
    console.log('weather',searchData);
    getData(searchData, forecastData)
    loading.style.display = 'none';
    content.style.display = 'block';
  }catch(error){
    connectionError.style.display = 'block';
    console.log(error.message);
  }finally{
    loading.style.display = 'none';
  }
}

const maxmind = async ()=>{
  try{
    loading.style.display = 'block';
    content.style.display = 'none';
    const geoData = await GeoLocation()
  // Get weather data from backend
    const res = await fetch(`${BACKEND}/api/current?lat=${geoData?.location?.latitude}&lon=${geoData?.location?.longitude}`);
    if (!res.ok) throw new Error("Failed to fetch weather");

    const forecastRes = await fetch(`${BACKEND}/api/forecast?city=${geoData?.country?.names?.en}`);
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast");

    const forecastData = await forecastRes.json();
    console.log("Current location forecast:", forecastData);

    const weatherData = await res.json();
    getData(weatherData, forecastData)
    loading.style.display = 'none';
    content.style.display = 'block';
    console.log("Current location weather:", weatherData);
  }catch(error){
    connectionError.style.display = 'block';
    console.log('error', error.message);
  }finally{
    loading.style.display = 'none';
  }
}

let charts = {};
const getData = (weather, forecast) => {

    const WeatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    const date = new Date(weather.dt * 1000)
    const hour = date.getHours()
    const night = hour < 6 || hour >= 18;
    document.body.style.backgroundImage = night ? 'url(lighthouse-night.jpg)' : 'url(coastline-mountain-pass-road-morning-daylight-scenery-.jpg)'
    weatherContainer.innerHTML = `<div style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top: 20px;background: #131212;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;-ms-border-radius: 5px;-o-border-radius: 5px;padding: 15px;min-width:30px;min-height:300px" id="weather-box"> 
          <h3 class="weather-title">${weather.name}, ${weather.sys.country}</h3>

          <div id="weather-details">
              <div style="display:flex;align-items:center; margin-right: 5px;"><img style="width:60px;" src=${WeatherIcon}> <p>${weather.weather[0].description}</p></div>
              <div style="display:flex;">
                <img style="width:30px; height:30px;margin-right:5px;align-items:center;" src="temperature.png"/>
                <p>temp: ${weather.main.temp.toFixed(0)} &deg;C<br></p>
              </div>
              <div style="display:flex;">
                <img style="width:30px; height:30px;margin-right:5px;align-items:center;" src="clouds.png"/>
                <p>cloud cover: ${weather.clouds.all}%</p>
              </div>
              <div style="display:flex;">
                <img style="width:30px; height:30px;margin-right:5px;align-items:center;" src="humidity.png"/>
                <p>Humidity: ${weather.main.humidity}%<br></p>
              </div>
              <div style="display:flex;">
                <img style="width:30px; height30px;margin-right:5px;align-items:center;" src="wind.png"/>
                <p>Wind speed: ${(weather.wind.speed * 3.6).toFixed(1)}km/h<br></p>
              </div>
              <div style="display:flex;align-items:center;">
                <img style="width:30px; height:30px;margin-right:5px;" src="atmospheric.png"/>
                <p>pressure: ${(weather.main.pressure)}hpa</p>
              </div>
          </div>
      </div>`

  forecastContainer.innerHTML = '';

  forecast?.list?.forEach((f)=>{
    const forecastIcon = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`
    const date = new Date(f.dt * 1000);
    const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };
    const dateStr = date.toLocaleString("en-US", options);

    const forecastHTML = `
      <div class="forecastInfo" style="min-width: 300px;min-height: 70px;margin: 0 5px 0 0;border-radius:5px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color: rgb(51, 0, 51);color:white;">
        <p id='time'>${dateStr}</p>
        <div style="display:flex; align-items:center; justify-content:start;">
        <img style="width: 65px; height: 65px;" src=${forecastIcon}>
        <p>${f.weather[0].description}</p>
        </div>
          <div>
          <div style="display:flex;">
            <p style="background: rgb(255, 99, 71,0.6);color: #ffb3a7;border-radius:5px;margin-right:5px;">temp</p>:
            ${f.main.temp.toFixed(0)}&deg;C
          </div>
          <div style="display:flex;">
            <p style="background: rgba(180, 200, 220, 0.15);color: #d8e6f5;border-radius:5px;margin-right:5px;">cloud cover</p>:
             ${f.clouds.all}%
          </div>
          <div style="display:flex;">
            <p style="background: rgba(0, 170, 255, 0.2);color: #9be2ff;border-radius:5px;margin-right:5px;">humidity</p>:
            ${f.main.humidity}%
          </div>
        </div>
      </div>
    `;
    forecastContainer.insertAdjacentHTML("beforeend", forecastHTML);
  })

  const ctx = document.getElementById('plot');
  const ctx1 = document.getElementById('plot1');

  const labels = forecast?.list.map(f => {
    const date = new Date(f.dt * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit"});
  });

  const tempData = forecast?.list.map(f => f.main.temp);
  const humidityData = forecast?.list.map(f => f.main.humidity);

  const Graph = (element,type) => {
    const id = element.id;
    if (charts[id]) {
      charts[id].data.labels = labels;
      charts[id].update();
    } else {
      charts[id] = new Chart(element, {
        type: type,
        data: {
          labels,
          datasets: [
            type == 'line' ? { label: 'Temperature', data: tempData, backgroundColor: "rgb(255, 99, 71)", fill: false,borderColor: 'rgb(255, 99, 71,0.6)', tension: 0.7 } :
            { label: 'Humidity', data: humidityData, backgroundColor: "rgb(2, 184, 230)", fill: false, tension: 0.4 }
          ]
        },
        options: {
          responsive: true,
          //true - keeps the aspect ratio (usually 2:1 width:height)
          maintainAspectRatio: false, //Chart.js will match container width & height exactly
          plugins: {
            legend: {
            display: true,
            text: 'Weather Forecast',
            font: { size: 18, weight: 'bold' },
            labels:{
              generateLabels: chart => {   // fully control legend box
                return chart.data.datasets.map((dataset, i) => ({
                  text: dataset.label,
                  fillStyle: dataset.borderColor || dataset.backgroundColor,
                  strokeStyle: 'transparent', // remove border
                  lineWidth: 0,
                  hidden: !chart.isDatasetVisible(i),
                  fontColor: 'white', //color of legend text
                  datasetIndex: i
                }));
              }
            }
            }
          },
          scales: {
            x: {
              alignToPixels: true,
              ticks: {
                color: 'white',      // X-axis tick labels color
                font: {
                  size: 10,
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgb(176, 220, 224)', // x-axis grid line color
                borderColor: 'rgb(176, 220, 224)',
                lineWidth: window.innerWidth >= 1440 ? 2.5 : 1 // thickness of grid lines depending on pixelRatio of device
              }
            },
            y: {
              alignToPixels: true,
              ticks: {
                color: 'white',      // Y-axis tick labels color
                font: {
                  size: 10,
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgb(176, 220, 224)', // y-axis grid line color
                borderColor: 'rgb(176, 220, 224)',
                lineWidth: window.innerWidth >= 1440 ? 2.5 : 1 // thickness of grid lines depending on pixelRatio of device
              }
            }
          }
        }
      });
    }
  };
  const graphData = [
    {element: ctx, type: 'line'},
    {element: ctx1, type: 'bar'}
  ]

  graphData.forEach(item => Graph(item.element, item.type))
}
const scroll_right = ()=>{
  if(window.innerWidth <= 320)
    forecastContainer.scrollBy({left: 150,behavior: 'smooth'})
  else
    forecastContainer.scrollBy({left: 400,behavior: 'smooth'})
}
const scroll_left = ()=>{
  forecastContainer.scrollBy({left: -400,behavior: 'smooth'})
}
const prev = document.querySelector('#prev')
prev.addEventListener('click',scroll_left)
const next = document.querySelector('#next')
next.addEventListener('click',scroll_right)

console.log('js loaded    ');
export const init = async ()=>{
  const searchInput = document.querySelector('#query-field')
  const clear = document.querySelector('#clear')
  const searchBtn = document.querySelector('#search-btn')
  clear.addEventListener('click', ()=>{
    searchInput.value = '';
    clear.style.visibility = 'hidden'
  })

  searchInput.addEventListener('input', (e)=>{
    if(e.target.value.trim() !== '')
      clear.style.visibility = 'visible'
    else
      clear.style.visibility = 'hidden'
  })
  searchBtn.addEventListener('click', async ()=>{
    let city = searchInput.value.trim();
    if(city === '')
      alert('Nothing to search e.g new york ')
    else
      await searching(city)
    return;
  })
  window.addEventListener('keydown', async (e)=>{
    if(e.key == 'Enter'){
      await searching(searchInput.value.trim())
    }
  })
  reload.addEventListener('click', ()=> window.location.reload())

  await maxmind();
}

document.addEventListener('DOMContentLoaded', init);
