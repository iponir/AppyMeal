// Generates the order customization form
function generateForm(){
	var form = document.getElementById("orderCustomization");

	// Iterate through options and construct optionsHTML
	var optionsHTML = '';
	for(var optionName in options){
		var currentOption = options[optionName];
		optionsHTML += '<h3>' + optionName + '</h3>';
		
		// Iterate through the current option choices
		for(var i = 0; i < currentOption.length; i++){
			optionsHTML += '<input type="radio" name="' + optionName + '" value="' + currentOption[i] + '"><label>' + currentOption[i] + '</label><br>';
		}
	}

	// Iterate through addons and construct addonsHTML
	var addonsHTML = '';
	for(var addonName in addons){
		var currentAddon = addons[addonName];
		addonsHTML += '<h3>' + addonName + '</h3>';
		
		// Iterate through the current addon choices
		for(var i = 0; i < currentAddon.length; i++){
			addonsHTML += '<input type="checkbox" name="' + addonName + '" value="' + currentAddon[i] + '"><label>' + currentAddon[i] + '</label><br>';
		}
	}

	// Add optionsHTML and addonsHTML to the form
	form.innerHTML = optionsHTML + addonsHTML + form.innerHTML;
}
