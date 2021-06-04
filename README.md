# team-preview
Pokémon team preview image generator

## Install

Install team-preview:
```
npm i team-preview
```

Install the Showdown! set parser:

```
npm i @pkmn/sets
```


### Generate a summary

```ts
import { Sets } from '@pkmn/sets';
import { summaryScreen, partyScreen } from 'team-preview';

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

const buffer = await summaryScreen(set);
```

Result:
![Greninja Static](https://cdn.discordapp.com/attachments/715564004621418577/850339032663326740/summary.gif)


### Generate a party preview

```ts
import { summaryScreen, partyScreen } from 'team-preview';

//array or collection of 6 sets
const buffer = await partyScreen(sets);
```


### Donations

Donations are gladly accepted. Please send them to my [Paypal.me](https://www.paypal.me/adrifcastr) or [Patreon](https://www.patreon.com/gideonbot)
to support the development, and maintenance of this project. Thank you!


### Credits

This project currently being owned and maintained by __adrifcastr.__