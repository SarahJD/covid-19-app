// Wrapping global variables in an IIFE
let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		if (typeof pokemon==='object') {   //check if data type of inserted parameter is an object
			if ('name' in pokemon){   //check if object has the required object keys
			pokemonList.push(pokemon);
			}else{
			console.log('This object does not have the correct object keys')
			}
		}else{
		console.log('This is not an object');
		}
	}

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
		button.addEventListener('click', function (event) {
			showDetails(pokemon);
		});
	}

	function showLoadingMessage() {
		alert('Data is being loaded.');
	}

	function hideLoadingMessage() {
				// disable alert of function showLoadingMessage
	}

	function loadList() {
		showLoadingMessage();
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			hideLoadingMessage();
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
				console.log(pokemon);
			});
		}).catch(function (e) {
			hideLoadingMessage();
			console.error(e);
		})
	}

	function loadDetails(item) {
		showLoadingMessage();
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function(details) {
			hideLoadingMessage();
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function(e) {
			hideLoadingMessage();
			console.error(e);
		});
	}

	function showDetails(pokemon) {
		pokemonList.loadDetails(pokemon).then(function () {
		console.log(pokemon);
	});
	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails
	};
})(); //end of IIFE

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
