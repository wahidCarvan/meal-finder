// food api starts
'use strict';
//variables decalred in the global scope should be ALL CAPS
// search path
const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search'
const EDAMAM_API_KEY =
'8a8331400d84d570a5aa12258b227c04'	
const EDAMAM_APPLICATION_ID = '8b5edbbf'
// walmart api
//google api
// making the request they need to be chained togethers


// getDataFromFoodApi takes 2 arguments search term and the callback 
//a callback is a function is executed after another one is called.
function getDataFromFoodApi(searchTerm, callback) {
  const query = {
  	q:`${searchTerm}`,
  	app_id: `${EDAMAM_APPLICATION_ID}`,
    app_key: `${EDAMAM_API_KEY}`,
   
  }
  //$ sign is jquery unless its a template literal. template literal is `${edamam_application_id}`
  console.log(query);
  $.getJSON(EDAMAM_SEARCH_URL, query, callback);
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
	for(var i = 0; i < result.hits.length && i < 1; i++) {
	// display the results to the page
		// debugger;
		//class js-food-item
		// the url or uri needs to go we only want a link for the recipe
		let listItem =
		 	`<div class ="js-food-item"> 
		 	<h2>
		 	<!--IMAGE -->
		 	 <a class="js-result-source" href="$"{result.html_url}" target="_blank">
			<img src="${result.hits[i].recipe.image}"/></a>
			<!--LABEL-->
		 		<a class="js-result-source" href="$"{result.html_url}" target="_blank"><p>${result.hits[i].recipe.label}</p></a>
		 		<!--SOURCE-->
		 	<a class="js-result-source" href="$"{result.html_url}" target="_blank">
		 	<p>${result.hits[i].recipe.source}</p>
				<h2>
			</div>`



   // <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> 


// ${result.hits[i].recipe.image}









	// grab the listItems and push in to the listItem
		// console.log(listItems);
		listItems.push(listItem)
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
	getDataFromFoodApi($('.js-query-search')
		.val(), renderResult);
	});
}
$(watchSubmit);
// javascript hoisting
// food api ends
