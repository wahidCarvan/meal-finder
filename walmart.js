'use strict';
// a7y3vjcmw34q743rnbpykyud walmart api key
const WALMART_SEARCH_URL = 'http://api.walmartlabs.com/v1/'
// 'http://api.walmartlabs.com/v1/search?query=eggs&format=json&apiKey=a7y3vjcmw34q743rnbpykyud'

const WALMART_API_KEY = 'a7y3vjcmw34q743rnbpykyud '

function getDataFromWalmartApi(searchTerm, callback) {
	const query = {
		q:`${searchTerm}`,
		app_key: `${WALMART_API_KEY}`,
	}


console.log(query);
$.getJSON(WALMART_SEARCH_URL, query, callback);
}

// https://developer.walmartlabs.com/io-docs