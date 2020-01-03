// Animate the loading blocks
function load(loadingBlocks, index){

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
