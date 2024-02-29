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
  var searchQuery = document.getElementById("searchInput").value;

  // Add the search query to the search history
  var searchHistory = document.getElementById("searchHistory");
  var listItem = document.createElement("li");
  listItem.textContent = searchQuery;
  searchHistory.appendChild(listItem);

  // Store the search history in local storage
  storeSearch(searchQuery);

  // Clear the input field
  document.getElementById("searchInput").value = "";

  // Call the function to get the weather data

});

// Save search query to local storage
function storeSearch(searchInput) {
  searchHistory.push(searchInput);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

// when a city is searched, dynamically update the large box to display the current weather conditions, 
// then do the same for the smaller boxes to show the 5 day forecast 

// Big Box 
// needs city name, weather icon, date in header - list of, temp, humidity, windspeed 
//
// header for 5 day forecast 
//
// 5 cards with everything just listed accept for the city name 

// when you select a city in the search history it shows that city's weather again 



// // JavaScript code to clear search history
// function clearSearchHistory() {
//   searchHistory = [];
//   localStorage.removeItem("searchHistory");
//   loadSearchHistory();
// }

// clearSearchHistory();