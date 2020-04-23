window.onpopstate = function(event){
	var pageURL = location.pathname.substr(1) + location.search;
	var dontUpdateHistory = true;
	goToPage(pageURL, dontUpdateHistory);
}

pages = {
	"login" : undefined,
	"home" : undefined,
	"menu" : undefined,
	"cart" : undefined
};

// Preload the specified pages
function preload(pageSpecs){
	for(var i = 0; i < pageSpecs.length; i++){
		var name = pageSpecs[i].name;
		var payload = pageSpecs[i].payload;
		pages[name] = modularjs.newModule(name, payload);
	}
}

// Shows the loading page and executes the specified function when loading is complete
function showLoading(functionName){
	
	// Check if all pages were already loaded
	var pageNames = Object.keys(pages);
	var alreadyLoaded = Array(pageNames.length);
	for(var i = 0; i < pageNames.length; i++){
		
		// If the current page was already loaded, make note
		if(pages[pageNames[i]]){
			alreadyLoaded[i] = true;
		}
	}

	// If all pages were already loaded, execute the provided function and return
	if(!alreadyLoaded.includes(undefined)){
		eval(functionName + "()");
		return;
	}

	var screen = modularjs.mainDoc.getElementById("screen");

	// Create the loading page
	var loadingPage = modularjs.newModule(
		"loading",
		{
			"onFinishedLoading" : functionName
		}
	);
	loadingPage.style["clip-path"] = "inset(0 0 0 100%)";
	loadingPage.style.transform = "translateY(-100%)";

	// Transition to the loading page
	screen.appendChild(loadingPage);
	animatePages();
}

// Animate the current page's exit and the next page's entrance
function animatePages(){
	var pages = document.querySelectorAll('#screen > module');
	
	/* TODO: solve animation issues and remove workaround */
	/* BEGIN_WORKAROUND */
	var mostRecentPage = pages[pages.length - 1];
	var screen = document.getElementById("screen");
	screen.innerHTML = "";
	screen.appendChild(mostRecentPage);
	mostRecentPage.style = "";

	return;
	/* END_WORKAROUND */

	// Disable pointer events so that this does not get triggered more than once
	document.body.style["pointer-events"] = "none";

	modularjs.doOnceLoaded.push(
		function(){
			setTimeout(
				function(){
					pages[0].style["clip-path"] = "inset(0 100% 0 0)";
					try{
						pages[1].style["clip-path"] = "inset(0 0 0 0)";
					}catch(e){}
				},
				200
			);
			setTimeout(
				function(){
					pages[0].remove();
					try{
						pages[1].style.transform = "unset";
					}catch(e){}
					document.body.style["pointer-events"] = "unset";
				},
				1000
			);
		}
	);
}

// Go to the specified page and update the browser history accordingly
function goToPage(pageURL, dontUpdateHistory){
	var pageRoot = pageURL.split("?")[0];
	var queryParams = pageURL.split("?")[1];

	switch(pageRoot){
		case "login":
			showLoading("goToLogin");
			break;
		case "home":
			showLoading("goHome");
			break;
		case "cart":
			showLoading("goToCart");
			break;
		case "details":
			var restaurantId = queryParams.split("&")[0].split("restaurantId=")[1];
			var itemName = decodeURI(queryParams.split("itemName=")[1]);
			var onLoadOperation = "(" +
				"function(){" +
					"goToDetails('" + restaurantId + "', '" + itemName + "');" +
				"}" +
			")";
			showLoading(onLoadOperation);
			break;
		default:
			showErrorPage("404 Not Found", "Oops! We couldn't find this page!");
	}

	// If the history is supposed to be updated, do so
	if(!dontUpdateHistory){
		window.history.pushState({}, '', pageURL);
	}
}

// Displays an error page
function showErrorPage(httpStatusCode, errorMessage){
	/* TODO: Implement error module */
	document.getElementById("screen").innerHTML = httpStatusCode + "<br>" + errorMessage;
}

// Navigate to the login
function goToLogin(){
	var screen = document.getElementById("screen");

	// Load the login page
	var login = pages.login;
	login.style["clip-path"] = "inset(0 0 0 100%)";
	login.style.transform = "translateY(-100%)";

	// Insert the home page
	screen.appendChild(login);
	animatePages();
}

// Navigate to the home page
function goHome(){
	var screen = document.getElementById("screen");

	// Load the home page
	var home = pages.home;
	home.style["clip-path"] = "inset(0 0 0 100%)";
	home.style.transform = "translateY(-100%)";

	// Insert the home page
	screen.appendChild(home);
	animatePages();
}

// Navigate to the cart
function goToCart(){
	var screen = document.getElementById("screen");

	// Load the cart
	var cart = pages.cart;
	cart.style["clip-path"] = "inset(0 0 0 100%)";
	cart.style.transform = "translateY(-100%)";

	// Display the cart
	screen.appendChild(cart);
	animatePages();
}

// Navigate to a particular restaurant's detail page based on the provided restaurant Id
function goToDetails(restaurantId, itemName){
	var screen = document.getElementById("screen");
	var xhttp = new XMLHttpRequest();
	var url = "/menus/" + restaurantId;
	var method = "GET";

	// Construct the details page based on the retrieved menu information
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var menu = JSON.parse(this.responseText);

			/*TODO: get list of images from payload sent by the API*/
			var restaurantInfo = {
				"restaurantId" : restaurantId,
				"name" : menu.__name,
				"images" : JSON.stringify(
					["/img/restaurants/" + restaurantId + "/food1.jpg", "/img/restaurants/" + restaurantId + "/food2.jpg"]
				),
				"type" : menu.__type,
				"menu" : JSON.stringify(menu)
			};

			// Load the home page
			var details = modularjs.newModule("details", restaurantInfo);
			details.style["clip-path"] = "inset(0 0 0 100%)";
			details.style.transform = "translateY(-100%)";

			// If itemName is not "undefined", show the item details
			if(itemName != "undefined"){
				itemName = decodeURIComponent(itemName).replace("&#39;", "'");
				console.log(menu);
				console.log(itemName);
				showMenuItem(restaurantId, itemName, menu[itemName]);

			// Else, insert the details page
			}else{
				screen.appendChild(details);
				animatePages();
			}

		}else if(this.readyState == 4){
			alert("There was an error loading the menu");
			throw this.responseText;
		}
	}

	// Retrieve the restaurant's menu
	xhttp.overrideMimeType("application/json");
	xhttp.open(method, url, true);
	xhttp.send();
}

// Show the customization info for a food item
function showMenuItem(restaurantId, itemName, menuItem){
	var screen = document.getElementById("screen");

	// Load the menu item
	var itemInfo = {
		"restaurantId" : restaurantId,
		"name" : itemName,
		"description" : menuItem.description,
		"options" : menuItem.options,
		"addons" : menuItem.addons
	}
	var menuItem = modularjs.newModule("menuItem", itemInfo);
	menuItem.style["clip-path"] = "inset(0 0 0 100%)";
	menuItem.style.transform = "translateY(-100%)";

	// Display the menu item
	screen.appendChild(menuItem);
	animatePages();

	// Add the item name to the URL
	//location.hash = itemName;
	//console.log("Altered history");
	//window.history.pushState({}, '', location.href + "&itemName=" + encodeURIComponent(itemName));
}

// Open the menu
function showMenu(){
	var screen = document.getElementById("screen");

	// Load the menu
	var menu = pages.menu;
	menu.style["clip-path"] = "inset(0 0 0 100%)";
	menu.style.transform = "translateY(-100%)";

	// Display the menu
	screen.appendChild(menu);
	animatePages();
}
