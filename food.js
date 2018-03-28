// food api starts
'use strict';
//variables decalred in the global scope should be ALL CAPS
// search path
//Path: https://api.edamam.com/search
//https://api.edamam.com/search?callback=jQuery32107494665425030487_
// 1521670508472&_=1521670508473

const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search'
const EDAMAM_API_KEY =
'8a8331400d84d570a5aa12258b227c04'	
const EDAMAM_APPLICATION_ID = '8b5edbbf'
//
function jsonpCallback(json) {
  console.log(json);
	 if(json.hits.length > 0) {
		renderResult(json);
    // $('.main-content').show()
	 } else {
	 	$('.fail-screen').show();
    $('.main-content').hide();
	 }
}

// $( "p" ).text( "<b>Some</b> new text." );


// hide the error page
//.show() .hide()
//a button needed is needed to go back to the main page
//
// getDataFromFoodApi takes 2 arguments search term and the callback 
//a callback is a function is executed after another one is called.
function placesCallback(results, status){
console.log(results, status);


      const markers = results.map(function(result){

      	return {
              map: window.map,
              title: result.name,
              position: result.geometry.location
            }

      });
      markers.forEach(function(marker){
      	new google.maps.Marker(marker)
      })
  console.log(markers);



      //     // For each place, get the icon, name and location.
      //     let bounds = new google.maps.LatLngBounds();
      //     places.forEach(function(place) {
      //       if (!place.geometry) {
      //         console.log("Returned place contains no geometry");
      //         return;
      //       }

      //       // Create a marker for each place.
              // markers.push(new google.maps.Marker({
            //   map: map,
            //   icon: icon,
            //   title: place.name,
            //   position: place.geometry.location
            // }));

      //       if (place.geometry.viewport) {
      //         // Only geocodes have viewport.
      //         bounds.union(place.geometry.viewport);
      //       } else {
      //         bounds.extend(place.geometry.location);
      //       }
      //     });
      //     map.fitBounds(bounds);
      //   // });
      // }
}
function getDataFromBothApi(searchTerm) {
	// let queryString =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=${searchTerm}&key=AIzaSyCPpIUMEgvm4Hy3mQdkhAYONjNw-Kw3y7M`
	// console.log(queryString);
	//  $.ajax({
	//  url: queryString,
 //  	dataType:'jsonp',
 //  	success: function(json, status, error){
 //  		console.log(json, status, error);
 //  	}
 // javascript user location google map
 // change pyrmont find out the out the users location
  	   // let pyrmont = {lat: -33.867, lng: 151.195};
  	   navigator.geolocation.getCurrentPosition(function(position){
  	   	console.log(position); 
  	   	  let service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: {lat: position.coords.latitude, lng: position.coords.longitude},
          keyword:  searchTerm,
          radius: 500,
       
          type: ['restaurant']
        }, placesCallback);
  	   		}, function (error){
  	   			 console.log(error);
  	   			});

			

  	 

  // const query = {
  // 	q:searchTerm,
  // 	app_id: `${EDAMAM_APPLICATION_ID}`,
  //   app_key: `${EDAMAM_API_KEY}`,
  //   ingr: 10,
  // }

  //$ sign is jquery unless its a template literal. template literal is `${edamam_application_id}`
  // console.log(query);
  // $.getJSON(EDAMAM_SEARCH_URL, query, callback);
  // we added the key value pairs manually using jsonp
  // jsonp requests data and gets a callback
  $.ajax({

  	url: 'https://api.edamam.com/search?callback=jsonpCallback&ingr=10&app_id=8b5edbbf&app_key=8a8331400d84d570a5aa12258b227c04&q='+searchTerm,
  	dataType:'jsonp'
  })

}
// make a function to render the results
function renderResult(result) {
	//hides the start page after the results are rendered
	$('.js-start-page').addClass("hidden");
	//grab the results div and display the result in html format
	$('.js-food-results').html(result);
	// declare a empty listItems array
	let listItems = [];
	// loop through the results
	for(var i = 0; i < result.hits.length && i < 5; i++) {
		console.log(result);
		//returns the ingredients and returns the list we use map
		let recipes = result.hits[i].recipe.ingredients.map(function(ingredient){
			return `<li>${ingredient.text}</li>`;
		});
		// left align the ul to remove the white space
	// display the results to the page
		let listItem =
		 	`<div class ="js-food-item"> 
		 	<!--IMAGE -->
			 	<img src="${result.hits[i].recipe.image}"/>
			<!--ingr-->
		 		<h1>${result.hits[i].recipe.label}</h1>
		 			<!--.join("") removes the commas since we are working with an array -->
		 		<ul>${recipes.join("")}</ul>
		 		<!--SOURCE-->
		 	<a href="${result.hits[i].recipe.url}" target="_blank">recipe</a>
			</div>`

	// grab the listItems and push in to the listItem
		// console.log(listItems);
		listItems.push(listItem);
		// console.log(listItems);

// push the listItem to listItems array
	// result.hits[i].uri
	// we make a object to store the data
	let recipe = {
	uri: "",
	label: "",
	image:"",
	source:"",
	url:"",
	ingr:"",
	}
		}

$('.js-food-results').html
(listItems.join(''));
console.log(result);
};
// function resultsRendered(){
// 	$('.js-start-page').addClass("hidden");
// };

function watchSubmit(){
// watches the submit button
$('.js-search-form').on('submit', function(event){
	event.preventDefault();
	getDataFromBothApi($('.js-query-search').val());
	//clears the search box
	$('.js-query-search').val("");
	});
}
// reload button NOT WORKING
function reloadPage () {
  $('main').on('click', '.restart', function (event) {
    location.reload();
   
  });
}
$(watchSubmit);



