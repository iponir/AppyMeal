pages = {
	"login" : undefined,
	"home" : undefined,
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
