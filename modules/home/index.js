// Adds svg content where necessary
function addSVG(){
	var likes = document.getElementsByClassName("like");

	// Add heart svg content
	for(var i = 0; i < likes.length; i++){
		console.log("adding heart svg");
		likes[i].innerHTML = '<svg height="30px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z" fill="dimgray"/></svg>';
	}
}
