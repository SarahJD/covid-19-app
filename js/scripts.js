// Wrapping global variables in an IIFE
let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');

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
		listItem.classList.add('list-group-item');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button');
		button.classList.add('btn', 'btn-primary', 'btn-block');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		button.addEventListener('click', function (event) {
			showDetails(pokemon);
		});
	}

	function showLoadingMessage(messageText) {
		let loadingMessage = document.createElement('div');
		let container = document.querySelector('.load-me');
		loadingMessage.classList.add('loading-message');
		loadingMessage.innerText = messageText;
		container.appendChild(loadingMessage);
	}

	function hideLoadingMessage() {
		let loadingMessage = document.querySelector('.loading-message');
		let container = document.querySelector('.load-me');
		if (loadingMessage) {
			container.removeChild(loadingMessage);
		}
	}

	function loadList() {
	showLoadingMessage('List is being loaded.');
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
		showLoadingMessage('Details are being loaded.');
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
		loadDetails(pokemon).then(function () {
			console.log(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);
		showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);
	});
	}

	function showModal(title, text, picture) {
		// clear existing Modal Content
		modalContainer.innerHTML = '';

		// create Modal
		let modal = document.createElement('div');
		modal.classList.add('modal');

		// add Close Button
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		// create Modal Title
		let titleElement = document.createElement('h1');
		titleElement.innerText = title;

		// create Modal Content
		let contentElement = document.createElement('p');
		contentElement.innerText = text;

		let contentPicture = document.createElement('img');
		contentPicture.classList.add('pokemon-picture');
		contentPicture.setAttribute("alt","Picture of a Pokemon");
		contentPicture.src = picture;

		// append newly created elements to Modal and Modal Container
		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modal.appendChild(contentPicture);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

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
