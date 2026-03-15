# Weather App

This is an interactive weather dashboard app that combines real-time geolocation, weather, and forecast data with visualization using and [Chart.js](https://www.chartjs.org/). It makes use of multiple APIs to provide current weather and forecast information for your location or any city you search.

## Features

- **Current Location Weather:** Detects your location using IP-based geolocation and displays current weather and forecast.
- **City Search:** Enter any city to view its weather, forecast.
- **Forecast Charts:** Visualizes forecast data (temperature,humidity) as interactive line and bar graphs.
- **Responsive UI:** Adapts for both mobile and desktop screens.
- **Loading States:** Displays loading indicators for async operations.

## How It Works

- **Geolocation:** On load, the app fetches your location via `/api/geolocation` (uses [GeoLite2-City.mmdb](https://www.maxmind.com/) on backend).
- **Weather Data:** Fetches weather from `/api/current/?lat={lat}&lon={lon}` and `/api/forecast?city={city}`.
- **Charts:** Uses Chart.js to plot forecast data for multiple weather metrics.
- **UI Controls:** Includes search, weather and forecast display.

## API Endpoints

- `/api/geolocation`: Returns user's location based on IP.
- `/api/weather?city={city}`: Returns current weather for searched city.
- `/api/current/?lat={lat}&lon={lon}`: Returns current weather for coordinates.
- `/api/forecast?city={city}`: Returns weather forecast for a city.

## Setup

1. **Clone the repository.**
```bash
    git clone <repo-url>
```
2. **Install dependencies** (if using a framework, e.g. Node.js, Express for backend).
```bash
    npm install
    npm run dev
```
*Backend Setup*
```bash
    cd weatherApi
    npm install
    npm run dev
```
4. **Add OpenWeatherApi key to weatherApi.**
*create .env file in root directory*
```js
    VITE_BACKEND_URL=your backend url //e.g https://x.onrender.com
```
*create .env file in weatherApi*
```js
    API_KEY=your openWeatherApi api key
```
6. **Open in your browser.**
```bash
    http://localhost:5173/
```

## how it works

- **On load:** Your location's weather is displayed.
- **Search:** Use the search bar to view weather for another city.
- **Forecast:** View upcoming weather in the forecast panel and charts.

## UI Overview

- **Weather Marker:** Shows city, country, weather icon, and major stats.
- **Forecast Panel:** Scrollable list of forecast entries with icons and details.
- **Charts:** Visualizes metrics over forecast period.
- **Search Bar:** Animated, responsive; enter city name to update data.
- **Fontawesome kits:** [Fontawesome](https://fontawesome.com/kits).
- **Animated loading icon:** [loading.io](https://loading.io/)

## Technologies

- **Chart.js:** Graphical data visualization.
- **OpenWeatherMap API:** Weather & forecast data.
- **maxmind:** IP-based geolocation database [GeoLite2-City.mmdb](https://www.maxmind.com/).
- **Vanilla JS:** All logic and interactivity.

## Customization

- **Style** via CSS and Chart.js options.

## Code Structure

- **GeoLocation, Searching, maxmind:** Async functions for location/weather API calls.
- **graphs:** Draws/updates forecast charts.
- **UI Handlers:** Search, animation, toggling panels, loading states.

## Example

```js
const geoData = await GeoLocation(); // get current location
const weatherData = await fetch(`/api/current/?lat=${geoData.latitude}&lon=${geoData.longitude}`);
const forecastData = await fetch(`/api/forecast?city=${geoData.city}`);
getData(await weatherData.json(), await forecastData.json());
```
## Credits

- OpenWeatherMap for weather data.
- maxmind GeoLite2-City.mmdb for geolocation.
