const { Sets } = require('@pkmn/sets');
const { summaryScreen, partyScreen } = require('./dist/index.js');
const { writeFileSync } = require('fs');

//Pokémon Showdown! set
const set = Sets.importSet(
`Gekkouga (Greninja-Ash) (M) @ Choice Specs  
 Ability: Battle Bond  
 Level: 100  
 Shiny: Yes  
 Pokeball: Cherish Ball  
 EVs: 252 SpA / 4 SpD / 252 Spe
 Timid Nature
 - Hydro Pump
 - Dark Pulse
 - Water Shuriken
 - Spikes
`);

async function gen() {
	console.log('Generating summary screen...');
	const summary = await summaryScreen(set);
	writeFileSync("./summary.jpg", summary);

	console.log('Generating party screen...');
	const party = await partyScreen([set, set, set, set, set, set]);
	writeFileSync("./party.jpg", party);
}

async function main() {
	try {
		console.log('Generating images...');
		await gen();
		console.log('Done!');
	} catch (e) {
		console.error(e);
	}
}

main();