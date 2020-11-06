let pokemonList
pokemonList=[
	{name: 'Bulbasaur', height: 7, type: ['grass','poison']},
	{name: 'Ivysaur', height: 3.03, type: ['grass','poison']},
	{name: 'Charmander', height: 2, type: 'fire'}];

for (let i = 0; i < pokemonList.length; i++) { //initialization, condition, action
	document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")"); // write it on the website

	if (pokemonList[i].height > 6) { //conditional
		document.write(" - Wow, that's big!"); // write it on the website
	}

	document.write("<br>"); // for line break when js-file is loaded into html side
}
