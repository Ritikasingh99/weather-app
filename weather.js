  
    async function getWeather() {
      const location = document.getElementById('locationInput').value.trim();
      const output = document.getElementById('output');

      if (!location) {
        output.innerHTML = '<span class="error">Please enter a city name.</span>';
        return;
      }

      output.innerHTML = 'Loading...';

      const apiKey = 'e118ac4b9d5943129ce140113250709';
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const tempC = data.current.temp_c;
        const condition = data.current.condition.text;
        const city = data.location.name;
        const country = data.location.country;

        output.innerHTML = `
          <strong>${city}, ${country}</strong><br>
          Temperature: ${tempC} °C<br>
          Condition: ${condition}
        `;
      } catch (err) {
        output.innerHTML = `<span class="error">Could not fetch weather. Please try again.</span>`;
        console.error(err);
      }
    }
  