
// Animate the loading blocks
function load(loadingBlocks, index){

	// Preload all pages
	var pageNames = Object.keys(pages);
	for(var i = 0; i < pageNames.length; i++){
		var name = pageNames[i];
		
		// If the page has already been preloaded, continue
		if(pages[name]){
			continue;
		}

		pages[name] = modularjs.newModule(name, {});
	}

	// If loadingBlocks is undefined, gather the loading blocks
	if(!loadingBlocks){
		var loadingBlocks = modularjs.mainDoc.getElementsByClassName("loadingBlock");
	}

	// If index is undefined, set it to 0
	if(!index){
		index = 0;
	}
	
	// If the index is greater than or equal to loadingBlocks.length, then return
	if(index >= loadingBlocks.length){
		return;
	}
	
	loadingBlocks[index].classList.add("fill");

	// Wait half a second, then animate the next loading block
	setTimeout(
		function(){
			load(loadingBlocks, index + 1)
		},
		1000
	);
}

// Initiate the loading sequence
setTimeout(load, 1000);
