

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });
}

function showError(message) {
  const errorElement = document.getElementById("error-message");
  errorElement.innerText = message;
  errorElement.style.display = "block";
}

function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      map.setCenter(location);
      new google.maps.Marker({
        map: map,
        position: location,
      });
    } else {
      showError(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => {
  const locationInput = document.getElementById("location-input");
  const address = locationInput.value;
  if (address.trim() === "") {
    showError("Please enter a valid location.");
  } else {
    geocodeAddress(address);
  }
});

initMap();
