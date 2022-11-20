const e = require("express");

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    console.log('why')
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    console.log(position)
  fetch("http://localhost:4000/location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }),
  })
    .then((res) => {
      //   if (res.ok) {
      //     console.log("success");
      //   } else {
      //     console.log("failure");
      //   }
      return res.json();
    })
    .then((data) => console.log(data));
  //   x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  //   console.log(position.coords.latitude)
  //   console.log(position.coords.longitude)
}

getLocation();
