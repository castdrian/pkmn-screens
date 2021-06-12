# team-preview
Pokémon team preview image generator

## Install

Install team-preview:
```
npm i team-preview
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
![Summary](https://cdn.discordapp.com/attachments/715564004621418577/852590843357691977/summary.jpg)


### Generate a party preview

```ts
import { summaryScreen, partyScreen } from 'team-preview';

//array of 6 sets
const buffer = await partyScreen([set, set2, set3, set4, set5, set6]);
```

Result:
![Party](https://cdn.discordapp.com/attachments/715564004621418577/852597065372532747/party.jpg)

### Donations

Donations are gladly accepted. Please send them to my [Paypal.me](https://www.paypal.me/adrifcastr) or [Patreon](https://www.patreon.com/gideonbot)
to support the development, and maintenance of this project. Thank you!


### Credits

This project currently being owned and maintained by __adrifcastr.__