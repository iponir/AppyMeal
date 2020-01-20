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

	// Add optionsHTML to the form
	form.innerHTML = optionsHTML + form.innerHTML;
}
