// Populate the menu based on the provided menu information
function populateMenu(menu){
	var menuElement = document.getElementById("menu").firstElementChild;
	
	// Iterate through menuJSON
	for(var itemName in menu){

		// If itemName is "__type" or "__name", continue
		if(itemName == "__type" || itemName == "__name"){
			continue;
		}

		menuElement.innerHTML += '<tr onclick=\'showMenuItem("' + restaurantId.replace(/'/g, "&#39;") + '", "' + itemName.replace(/'/g, "&#39;") + '", ' + JSON.stringify(menu[itemName]).replace(/'/g, "&#39;") + ')\'>' +
			'<td>' +
				'<h3>' + itemName + '</h3>' +
				'<p>' + menu[itemName].description + '</p>' +
			'</td>' +
			'<td>$' + menu[itemName].price.toFixed(2) + '</td>' +
		'</tr>';
	}
}

populateMenu(menu);
