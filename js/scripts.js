// Wrapping global variables in an IIFE

let pokemonRepository = (function() {
	let pokemonList=[
		{name: 'Bulbasaur', height: 7, type: ['grass','poison']},
		{name: 'Ivysaur', height: 3.03, type: ['grass','poison']},
		{name: 'Charmander', height: 2, type: 'fire'}
	];

	function getAll() {
		return pokemonList;
	}

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	return {
		getAll: getAll,
		add: add
	};
})();

/* 1st possibility: with a for loop
for (let i = 0; i < pokemonRepository.getAll().length; i++) { //initialization, condition, action
	document.write("<p>" + pokemonRepository.getAll()[i].name + " (height: " + pokemonRepository.getAll()[i].height + ")" + "</p>"); // write it on the website
}
*/


/* 2nd possibility: with a for each loop and an anonymous function
pokemonRepository.getAll().forEach(function(pokemon) {
	document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")");
	if (pokemon.height > 6) {
		document.write(" - Wow, that's big!");
	};
	document.write("</p>")
});
*/

//3rd possibility: with a for each loop and a named function

function myLoopFunction(pokemon) {
	document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")");
	if (pokemon.height > 6) {
		document.write(" - Wow, that's big!");
	};
	document.write("</p>")
}
pokemonRepository.getAll().forEach(myLoopFunction); //calling the getAll function in order to retrieve the data inside the IIFE

document.write("<br>"); // for line break when js-file is loaded into html side
