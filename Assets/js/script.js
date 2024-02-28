var APIKey = "00a1c68c1e376f0f946c964d9733d6f5";

// record searches and save them to local storage, display them on screen in a search history 

// when a city is searched, dynamically update the large box to display the current weather conditions, 
// then do the same for the smaller boxes to show the 5 day forecast 

// Big Box 
// needs city name, weather icon, date in header - list of, temp, humidity, windspeed 
//
// header for 5 day forecast 
//
// 5 cards with everything just listed accept for the city name 

// when you select a city in the search history it shows that city's weather again 

    // JavaScript code for handling form submission and search history
    document.getElementById("searchBar").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission

      // Get the search query from the input field
      var searchQuery = document.getElementById("searchInput").value;

      // Add the search query to the search history
      var searchHistory = document.getElementById("searchHistory");
      var listItem = document.createElement("li");
      listItem.textContent = searchQuery;
      searchHistory.appendChild(listItem);

      // Clear the input field
      document.getElementById("searchInput").value = "";

      // Perform the search or redirect to search results page
      // Add your code here to handle the search functionality
    });