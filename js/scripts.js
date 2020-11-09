let pokemonList=[
	{name: 'Bulbasaur', height: 7, type: ['grass','poison']},
	{name: 'Ivysaur', height: 3.03, type: ['grass','poison']},
	{name: 'Charmander', height: 2, type: 'fire'}
];

/* 1st possibility: with a for loop
for (let i = 0; i < pokemonList.length; i++) { //initialization, condition, action
	document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "</p>"); // write it on the website
}
*/

/*2nd possibility
pokemonList.forEach(function(pokemon) {
	document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")");
	if (pokemon.height > 6) {
		document.write(" - Wow, that's big!");
	};
	document.write("</p>")
});
*/

//3rd possibility

function myLoopFunction(pokemon) {
	document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")");
	if (pokemon.height > 6) {
		document.write(" - Wow, that's big!");
	};
	document.write("</p>")
}
pokemonList.forEach(myLoopFunction);





	document.write("<br>"); // for line break when js-file is loaded into html side




/*
function divide(dividend, divisor) {
	if (divisor===0) {
		return "You're trying to divide by zero."
	}else{
		let result = dividend / divisor;
		return result;
	}
}
*/
