var APIKey = "00a1c68c1e376f0f946c964d9733d6f5";

var searchHistory = [];

// Load search history from local storage
if (localStorage.getItem("searchHistory")) {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  loadSearchHistory();
};

// Display search history on screen
function loadSearchHistory() {
  var searchEl = document.getElementById("searchHistory");
  searchEl.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = searchHistory[i];
    searchEl.appendChild(listEl);
  }
};

// Search Bar and Search History
document.getElementById("searchBar").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the search query from the input field
  var cityName = document.getElementById("searchInput").value;

  // Add the search query to the search history
  var searchHistory = document.getElementById("searchHistory");
  var listItem = document.createElement("li");
  listItem.textContent = cityName;
  searchHistory.appendChild(listItem);

  // Store the search history in local storage
  storeSearch(cityName);

  // Clear the input field
  document.getElementById("searchInput").value = "";

  // Call the function to get the weather data
  updateWeather(cityName);

});

// Save search query to local storage
function storeSearch(searchInput) {
  searchHistory.push(searchInput);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

// Get the current weather and 5-day forecast for a city
function updateWeather(city) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

  // Fetch the weather data from the API
  fetch(requestUrl)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error: " + res.status);
      }
    })
    .then(function (data) {
      // Update the big box with the current weather conditions
      console.log(city);
      console.log(data);
      // clear greeting instructions
      var heading = document.getElementById("currentWeather");
      heading.innerHTML = "";

      var cityNameEl = document.createElement("h2");
      cityNameEl.textContent = data.name;
      document.getElementById("currentWeather").appendChild(cityNameEl);

      var weatherIconEl = document.createElement("img");
      weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      document.getElementById("currentWeather").appendChild(weatherIconEl);

      var dateEl = document.createElement("p");
      dateEl.textContent = dayjs().format("MMMM DD, YYYY");
      document.getElementById("currentWeather").appendChild(dateEl);

      var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature: " + data.main.temp + "°C";
      document.getElementById("currentWeather").appendChild(tempEl);

      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
      document.getElementById("currentWeather").appendChild(humidityEl);

      var windSpeedEl = document.createElement("p");
      windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + " m/s";
      document.getElementById("currentWeather").appendChild(windSpeedEl);
    })
    .catch(function (error) {
      console.log(error);
    });

  // Get the 5-day forecast data
  var forecastReqUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;

  // Fetch the forecast data from the API
  fetch(forecastReqUrl)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error: " + res.status);
      }
    })
    .then(function (data) {
      // Clear the existing forecast cards
      var cardContainerEl = document.getElementById("card-container");
      cardContainerEl.innerHTML = "";

      // Select the data we want to use
      var dataSet = [
        data.list[4],
        data.list[12],
        data.list[20],
        data.list[28],
        data.list[36]
      ];

      // Loop through the forecast data and create cards for each day
      for (var i = 0; i < dataSet.length; i++) {
        var weatherData = dataSet[i];

        var cardEl = document.createElement("div");
        cardEl.classList.add("weatherCard");

        var cardDateEl = document.createElement("h3");
        cardDateEl.textContent = dayjs(weatherData.dt_txt).format("MMMM DD, YYYY");
        cardEl.appendChild(cardDateEl);

        var cardIconEl = document.createElement("img");
        cardIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
        cardEl.appendChild(cardIconEl);

        var cardTempEl = document.createElement("p");
        cardTempEl.textContent = "Temperature: " + weatherData.main.temp + "°C";
        cardEl.appendChild(cardTempEl);

        var cardHumidityEl = document.createElement("p");
        cardHumidityEl.textContent = "Humidity: " + weatherData.main.humidity + "%";
        cardEl.appendChild(cardHumidityEl);

        var cardWindSpeedEl = document.createElement("p");
        cardWindSpeedEl.textContent = "Wind Speed: " + weatherData.wind.speed + " m/s";
        cardEl.appendChild(cardWindSpeedEl);

        cardContainerEl.appendChild(cardEl);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Call the updateWeather function with the city name when a search is made
document.getElementById("searchBar").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  var cityName = document.getElementById("searchInput").value;
  updateWeather(cityName);
  // reset the search bar
  document.getElementById("searchInput").value = "";
});

// when you select a city in the search history it shows that city's weather again 
document.getElementById("searchHistory").addEventListener("click", function (event) {
  var cityName = event.target.textContent;
  updateWeather(cityName);
});


// // JavaScript code to clear search history
// function clearSearchHistory() {
//   searchHistory = [];
//   localStorage.removeItem("searchHistory");
//   loadSearchHistory();
// }

// clearSearchHistory();