// Populate the menu based on the provided menu information
function populateMenu(menu){
	var menuElement = document.getElementById("menu");
	
	// Iterate through menuJSON
	for(var itemName in menu){
		menuElement.innerHTML += '<tr>' +
			'<td>' +
				'<h3>' + itemName + '</h3>' +
				'<p>' + menu[itemName].description + '</p>' +
			'</td>' +
			'<td>$' + menu[itemName].price + '</td>' +
		'</tr>';
	}
}

populateMenu(menu);
