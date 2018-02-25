// food 2 fork api
const FOOD2FORK_SEARCH_URL = "http://food2fork.com/api/search";
const FOOD2FORK_API_KEY = '449586ebc72336a967d11e3265f14b71 '
// function get data from api search food 2 fork
function getDataFromFoodApi(searchTerm, callback){
	const query = {
		part: ''
		q: `${searchTerm}`,
		per_page: 5,
		type: 'image/text' //?????
		key: `{FOOD2FORK_API_KEY}`
	}
	console.log(query);
	// get the data in json format
	$.getJSON(FOOD2FORK_SEARCH_URL, query, callback);
}



// function render the results


// function display the data

// function trigger the submit button


















// youtube api
// const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
// const YOUTUBE_API_KEY = 'AIzaSyCbPOEs1xm4D_cEvM8BDSfrYJMcRJirqfg';

// google api
// const GOOGLE_MAP_SEARCH_ URL: ''
// const GOOGLE_MAP_API = "AIzaSyBUoQHu_qBPC8oNhbW9dMDFB7Wr4fsByrg"


