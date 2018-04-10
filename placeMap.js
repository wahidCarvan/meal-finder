  // initilazies the map
  function initMap() {
        // displays the map on the page makes the map
        let map = new google.maps.Map(document.getElementById('map'), {
            // intial location map is set to
          center: {lat: 39.833851, lng: -74.871826},
          zoom: 16,
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER
          },
      });
        window.map = map;
    };
    // Google map ends, the modal begins
// Get the modal
let modal = document.getElementById('myModal');
// Get the button that opens the modal
let btn = document.getElementById("modal-button");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
