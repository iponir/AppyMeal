
// Animate the current page's exit and the next page's entrance
function animatePages(){
	var pages = document.querySelectorAll('#screen > module');
	modularjs.doOnceLoaded.push(
		function(){
			setTimeout(
				function(){
					pages[0].style["clip-path"] = "inset(0 100% 0 0)";
					pages[1].style["clip-path"] = "inset(0 0 0 0)";
				},
				500
			);
			setTimeout(
				function(){
					pages[0].remove();
					pages[1].style.transform = "unset";
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
	var home = modularjs.newModule("home", {});
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
	var cart = modularjs.newModule("cart", {});
	cart.style["clip-path"] = "inset(0 0 0 100%)";
	cart.style.transform = "translateY(-100%)";

	// Display the cart
	screen.appendChild(cart);
	animatePages();
}
