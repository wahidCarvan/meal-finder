  // initilazies the map
      function initMap() {
        // displays the map on the page makes the map
        let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.833851, lng: -74.871826},
          zoom: 18,
          zoomControl: true,
         	zoomControlOptions: {
        		position: google.maps.ControlPosition.LEFT_CENTER
    		},
        });
    window.map = map;

      };

