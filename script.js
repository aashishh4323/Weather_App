const getWeather = (city = 'delhi', callback = null) => {
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'YOUR_API_KEY',
      'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    }
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(`API Response for ${city}:`, data);
      if (!callback) {
        const location = data.location;
        const condition = data.current_observation?.condition;
        const wind = data.current_observation?.wind;
        const atmosphere = data.current_observation?.atmosphere;

        document.getElementById("cityName").innerHTML = city;
        document.getElementById("region").innerHTML = location?.region ?? 'N/A';
        document.getElementById("temp").innerHTML = condition?.temperature ?? 'N/A';
        document.getElementById("timezone_id").innerHTML = location?.timezone_id ?? 'N/A';
        document.getElementById("latitude").innerHTML = location?.lat ?? 'N/A';
        document.getElementById("longitiude").innerHTML = location?.long ?? 'N/A';
        document.getElementById("Wind_direction").innerHTML = wind?.direction ?? 'N/A';
        document.getElementById("wind_speed").innerHTML = wind?.speed ?? 'N/A';
        document.getElementById("Humidity").innerHTML = atmosphere?.humidity ?? 'N/A';
        document.getElementById("pressure").innerHTML = atmosphere?.pressure ?? 'N/A';
      }
      if (callback) callback(city, data);
    })
    .catch(error => console.error(`Fetch error for ${city}:`, error));
};
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  getWeather(city);
});
window.onload = function () {
  getWeather("Delhi");
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; 
const cities = [ "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad"];
  cities.forEach(city => {
    getWeather(city, (name, data) => {
      const location = data.location;
      const condition = data.current_observation?.condition;
      const wind = data.current_observation?.wind;
      const atmosphere = data.current_observation?.atmosphere;
      const row = `
        <tr>
          <th scope="row" class="text-start">${name}</th>
          <td>${name}</td>
          <td>${condition?.temperature ?? 'N/A'}</td>
          <td>${location?.timezone_id ?? 'N/A'}</td>
          <td>${location?.lat ?? 'N/A'}</td>
          <td>${location?.long ?? 'N/A'}</td>
          <td>${wind?.direction ?? 'N/A'}</td>
          <td>${wind?.speed ?? 'N/A'}</td>
          <td>${atmosphere?.humidity ?? 'N/A'}</td>
          <td>${atmosphere?.pressure ?? 'N/A'}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  });
};
