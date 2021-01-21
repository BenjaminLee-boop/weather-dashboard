function getWeather(CityName) {
  let now = moment();
  const WEATHER_API_KEY = "0cf4eae4bb76e51533e83335fd9ace51";
  const OwmBaseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=`;
  function kelvinToCel(kelvin) {
    return parseFloat(kelvin) - 273.1;
  }
  $.ajax(OwmBaseUrl + WEATHER_API_KEY).then((r) => {
    const long = r.coord.lon;
    const lat = r.coord.lat;
    const cityName = r.name;
    const imgUrl =
      "https://openweathermap.org/img/wn/" + r.weather[0].icon + ".png";
    $("#temperature").html(
      `<img src="${imgUrl}" />${kelvinToCel(r.main.temp).toFixed(1)}`,
    );
    $("#humidity").html(r.main.humidity);
    if (parseFloat(r.main.humidity) < 5.7) {
      $("#Wind-Speed").addClass("text-success");
    } else if (parseFloat(r.main.humidity) >= 11) {
      $("#Wind-Speed").addClass("text-warning");
    } else if (parseFloat(r.main.humidity) > 1.1) {
      $("#Wind-Speed").addClass("text-danger");
    }
    $("#Wind-Speed").html(r.wind.speed);
    $("#cityName").html(r.name);
    $("#dateHeader").html(now.format("DD/MM/YYYY"));
    $.ajax(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`,
    ).then((r) => {
      if (parseFloat(r.value) < 5.0) {
        $("#UVIndex").addClass("text-success");
      } else if (parseFloat(r.value) >= 5.0) {
        $("#UVIndex").addClass("text-warning");
      } else if (parseFloat(r.value) > 8.0) {
        $("#UVIndex").addClass("text-danger");
      }
      $("#UVIndex").html(r.value);
      $.ajax(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${WEATHER_API_KEY}`,
      ).then((r) => {
        $("#day-1-title").html(moment.unix(r.daily[1].dt).format("DD/MM/YYYY"));
        $("#day-2-title").html(moment.unix(r.daily[2].dt).format("DD/MM/YYYY"));
        $("#day-3-title").html(moment.unix(r.daily[3].dt).format("DD/MM/YYYY"));
        $("#day-4-title").html(moment.unix(r.daily[4].dt).format("DD/MM/YYYY"));
        $("#day-5-title").html(moment.unix(r.daily[5].dt).format("DD/MM/YYYY"));
        console.log();
        $("#day-1-card").html(
          `<b>Temperature</b> <br> <img src="https://openweathermap.org/img/wn/${r.daily[1].weather[0].icon}.png""/> ${r.daily[1].temp.day} <br> <b>Humidity</b> <br> ${r.daily[1].humidity}`,
        );
        $("#day-2-card").html(
          `<b>Temperature</b> <br> <img src="https://openweathermap.org/img/wn/${r.daily[2].weather[0].icon}.png""/> ${r.daily[2].temp.day} <br> <b>Humidity</b> <br> ${r.daily[2].humidity}`,
        );
        $("#day-3-card").html(
          `<b>Temperature</b> <br> <img src="https://openweathermap.org/img/wn/${r.daily[3].weather[0].icon}.png""/> ${r.daily[3].temp.day} <br> <b>Humidity</b> <br> ${r.daily[3].humidity}`,
        );
        $("#day-4-card").html(
          `<b>Temperature</b> <br> <img src="https://openweathermap.org/img/wn/${r.daily[4].weather[0].icon}.png""/> ${r.daily[4].temp.day} <br> <b>Humidity</b> <br> ${r.daily[4].humidity}`,
        );
        $("#day-5-card").html(
          `<b>Temperature</b> <br> <img src="https://openweathermap.org/img/wn/${r.daily[5].weather[0].icon}.png""/> ${r.daily[5].temp.day} <br> <b>Humidity</b> <br> ${r.daily[5].humidity}`,
        );
      });
    });
  });
}

function handleSearchHistory() {}
getWeather("Adelaide");
$("#searchButton").click((e) => {
  e.preventDefault();
  const searchTerm = $("#searchText").val();
  getWeather(searchTerm);
});

$("#Adelaide").click(() => {
  getWeather("Adelaide");
});
$("#Melbourne").click(() => {
  getWeather("Melbourne");
});
$("#Sydney").click(() => {
  getWeather("Sydney");
});
$("#Darwin").click(() => {
  getWeather("Darwin");
});
$("#Tasmania").click(() => {
  getWeather("Tasmania");
});
$("#WesternAustralia").click(() => {
  getWeather("Western Australia");
});
