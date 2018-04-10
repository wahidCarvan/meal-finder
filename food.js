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
let finalSearchTerm = '';
function jsonpCallback(json) {

  if(json.hits.length > 0) {

   renderResult(json);

 } 
 else {
  showFailScreen();

}
}

function showFailScreen() {
  $('body').removeClass('background-image');
  $('.fail-screen').show();
  $('.main-content').hide();
  $('.fail-screen').on('click', '.restart', function (event) {
      //location.reload()
      console.log(location);
      location.reload();
    });
};
// $( "p" ).text( "<b>Some</b> new text." );


// hide the error page
//.show() .hide()
//a button needed is needed to go back to the main page
//
// getDataFromFoodApi takes 2 arguments search term and the callback 
//a callback is a function is executed after another one is called.
function placesCallback(results, status){
 if(status != 'OK') {
   return showFailScreen();
 }  
//ternary operator
//3 parts boolean
//first expression
//second expression
// add the css inline for this part
const markers = results.map(function(result){
  console.log(result);
  let infowindow = new google.maps.InfoWindow({
    content: `<div>
    <h1>${result.name}</h1>
    <p>${result.vicinity}</p>
    <p>${result.opening_hours.open_now?'open now':'closed'}</p>
    <p>Rating:${result.rating}</p>
    </div>`
  });
  const marker = new google.maps.Marker ({
    map: window.map,
    title: result.name,
    position: result.geometry.location,
  })
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  })
  return marker;
});
// markers.forEach(function(marker){
//  new google.maps.Marker(marker)
// })
console.log(markers);
}

function getDataFromBothApi(searchTerm) {
 finalSearchTerm = searchTerm;
// makes the call to edamam
$.ajax({
 url: 'https://api.edamam.com/search?callback=jsonpCallback&ingr=10&app_id=8b5edbbf&app_key=8a8331400d84d570a5aa12258b227c04&q='+searchTerm,
 dataType:'jsonp'
})

// makes the call google places
navigator.geolocation.getCurrentPosition(function(position){
    // console.log('gotten current position', new Date())

    console.log(position); 
    let map = new google.maps.Map(document.getElementById('map'), {
      // lat and long updated to get users position
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
    });
    window.map = map;
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: {lat: position.coords.latitude, lng: position.coords.longitude},
      keyword:  finalSearchTerm,
      radius: 500,
      type: ['restaurant']
    }, placesCallback);
  }, function (error){
    console.log(error);
  });

}

// make a function to render the results
function renderResult(result) {
  $('body').removeClass('background-image');
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
   // 
   let listItem =
   `<div class ="js-food-item"> 
   <!--IMAGE -->
   <div style="background-image: url(${result.hits[i].recipe.image}); background-size:cover; height: 500px; width: 500px; background-repeat: no-repeat"> </div> 
   
   <!--ingr-->
   <h1>${result.hits[i].recipe.label}</h1>
   <!--.join("") removes the commas since we are working with an array -->
   <ul>${recipes.join("")}</ul>
   <!--SOURCE-->
   <a class=recipes href="${result.hits[i].recipe.url}" target="_blank">Learn more about the recipe</a>
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
  //calling reloadPage
  $('.main-content').on('click', '.search-again', function (event) {
    location.reload();

  });
  $('.js-search-results').show();
});
}
$(watchSubmit);





