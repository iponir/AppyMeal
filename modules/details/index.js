// Populate the menu based on the provided menu information
function populateMenu(menu){
	var menuElement = document.getElementById("menu").firstElementChild;
	
	// Iterate through menuJSON
	for(var itemName in menu){

		// If itemName is "__type" or "__name", continue
		if(itemName == "__type" || itemName == "__name"){
			continue;
		}

		menuElement.innerHTML += '<tr onclick=\'showMenuItem("' + restaurantId + '", "' + itemName + '", ' + JSON.stringify(menu[itemName]) + ')\'>' +
			'<td>' +
				'<h3>' + itemName + '</h3>' +
				'<p>' + menu[itemName].description + '</p>' +
			'</td>' +
			'<td>$' + menu[itemName].price + '</td>' +
		'</tr>';
	}
}

populateMenu(menu);
