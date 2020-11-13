// Wrapping global variables in an IIFE
let pokemonRepository = (function() {
	let pokemonList=[
		{name: 'Bulbasaur', height: 7, type: ['grass','poison']},
		{name: 'Ivysaur', height: 3.03, type: ['grass','poison']},
		{name: 'Charmander', height: 2, type: 'fire'},
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
			if ('name' in pokemon && 'height' in pokemon && 'type' in pokemon){ //check if object has all of the required object keys
			pokemonList.push(pokemon);
			}else{
			console.log('This object does not have the correct object keys')
			}
		}else{
		console.log('This is not an object');
		}
	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem
	};
})(); //end of IIFE

// building the surface
pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon)
});

// just to check if object validation for the add-function's parameter works
pokemonRepository.add({name: 'sarah', height: 3, type: 'poison'});
console.log(pokemonRepository.getAll());

// filter() function in order to check if a certain pokemon name is included in the array
let checkName = pokemonRepository.getAll().filter(entry => entry.name === 'Charmander')
