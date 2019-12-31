// Kick off the login procedure
function login(){
	var screen = modularjs.mainDoc.getElementsById("screen");
	
	// Create the loading page
	var loadingPage = modularjs.newModule(
		"loading",
		{
			"onFinishedLoading" : goHome
		}
	);

	// Clear the screen, then append the loading page
	screen.firstElementChild.remove();
	screen.appendChild(loadingPage);
}
