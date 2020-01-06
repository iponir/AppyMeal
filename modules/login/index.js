// Kick off the login procedure
function login(){
	var screen = modularjs.mainDoc.getElementById("screen");
	
	// Create the loading page
	var loadingPage = modularjs.newModule(
		"loading",
		{
			"onFinishedLoading" : "goHome"
		}
	);
	loadingPage.style["clip-path"] = "inset(0 0 0 100%)";
	loadingPage.style.transform = "translateY(-100%)";

	// Transition to the loading page
	screen.appendChild(loadingPage);
	animatePages();

	// Return false to prevent page redirect
	return false;
}

// Append the login page to pages
modularjs.doOnceLoaded.push(
	function(){
		pages.login = modularjs.mainDoc.querySelector('[name="login"]');
	}
);
