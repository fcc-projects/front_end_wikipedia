$(document).ready(function() {

	$( "#search-form" ).submit(function( event ) {
		  queryWiki($('#search').val());
		  event.preventDefault();
	});


	function queryWiki(value) {
		$.ajax({
			dataType: "json",
			cache: false,
		  	url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + value,
		  	success: function(response) {
      			var pages = response.query.pages;
      			var pageids = [];
      			var titles = [];
      			var extracts = [];

      			for(var page in pages){
				    pageids.push(pages[page]["pageid"]);
				    titles.push(pages[page]["title"]);
				    extracts.push(pages[page]["extract"]);
				}

				clearPreviousResults();
				buildResults(pageids, titles, extracts);
      		}
		})
	}

	function clearPreviousResults() {
		$('ul.results-container').empty();
	}

	function buildResults(pageids, titles, extracts) {

		for (var i = 0; i < pageids.length ; i++) {
			$('ul.results-container').append(
    			$('<li>').attr('class', 'result-container').append(
        			$('<a>').attr('href','https://en.wikipedia.org/?curid=' + pageids[i]).append(
	            		$('<h2>').attr('class', 'result-title').append(titles[i]), 
	            		$('<div>').attr('class', 'result-snippet').append(extracts[i]))));  
		}
	}
});