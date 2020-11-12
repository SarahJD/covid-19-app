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

	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		addEventListenerToButton(button, pokemon);
	}

	function addEventListenerToButton(myButton, myPokemon){
		myButton.addEventListener('click', function(){showDetails(myPokemon)});
	}

	function showDetails(pokemon) {
		console.log(pokemon);
	}

	function add(pokemon) {
		if (typeof pokemon==='object') { //check if data type of inserted parameter is an object
		pokemonList.push(pokemon);
		}else{
		console.log('This is not an object');
		}
		/*
		if (Object.key pokemon==='name' && 'height' && 'type') { //this is not the way it works, but I don't know the correct way
		pokemonList.push(pokemon);
		}else{
	console.log('This object does not have the correct object keys');
	}
	*/
	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem
	};
})();

// adding an item to the array
pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon)
});

// just to check if object validation for the add-function's parameter works
pokemonRepository.add({a:1});
console.log(pokemonRepository.getAll());
console.log(Object.keys(pokemonRepository.getAll())); // returning the indices/length, not the keys like name, height, type

// filter() function in order to check if a certain pokemon name is included in the array
let checkName = pokemonRepository.getAll().filter(entry => entry.name === 'Charmander')
