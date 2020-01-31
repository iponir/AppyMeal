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

// Animate the current page's exit and the next page's entrance
function animatePages(){
	var pages = document.querySelectorAll('#screen > module');

	// Disable pointer events so that this does not get triggered more than once
	document.body.style["pointer-events"] = "none";

	modularjs.doOnceLoaded.push(
		function(){
			setTimeout(
				function(){
					pages[0].style["clip-path"] = "inset(0 100% 0 0)";
					pages[1].style["clip-path"] = "inset(0 0 0 0)";
				},
				200
			);
			setTimeout(
				function(){
					pages[0].remove();
					pages[1].style.transform = "unset";
					document.body.style["pointer-events"] = "unset";
				},
				1000
			);
		}
	);
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
function goToDetails(restaurantId){
	var screen = document.getElementById("screen");
	var xhttp = new XMLHttpRequest();
	var url = encodeURI("/menus/" + restaurantId);
	var method = "GET";

	// Construct the details page based on the retrieved menu information
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var menu = JSON.parse(this.responseText);
			var restaurantInfo = {
				"restaurantId" : restaurantId,
				"name" : menu.__name,
				"image" : "/img/restaurants/" + restaurantId + "/food1.jpg",
				"type" : menu.__type,
				"menu" : JSON.stringify(menu)
			};

			// Load the home page
			var details = modularjs.newModule("details", restaurantInfo);
			details.style["clip-path"] = "inset(0 0 0 100%)";
			details.style.transform = "translateY(-100%)";

			// Insert the details page
			screen.appendChild(details);
			animatePages();
		}else if(this.readyState == 4){
			alert("There was an error loading the menu");
			throw this.responseText;
		}
	}

	// Retrieve the restaurant's menu
	xhttp.open(method, url, true);
	xhttp.setRequestHeader("accept", "application/json");
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
		"options" : menuItem.options
	}
	console.log(itemInfo);
	var menuItem = modularjs.newModule("menuItem", itemInfo);
	menuItem.style["clip-path"] = "inset(0 0 0 100%)";
	menuItem.style.transform = "translateY(-100%)";

	// Display the menu item
	screen.appendChild(menuItem);
	animatePages();
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
