// Navigate to the home page
function goHome(){
	var screen = document.getElementById("screen");

	// Load the home page
	var home = modularjs.newModule("home", {});

	// Display the home page
	screen.innerHTML = "";
	screen.appendChild(home);
}
