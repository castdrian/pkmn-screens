# team-preview
Pokémon team preview image generator

## Generate a static summary

```ts
import { Sets } from '@pkmn/sets';
import { summaryScreen, partyScreen } from 'team-preview';

const set = Sets.importSet(
`Gekkouga (Greninja) (M) @ Choice Scarf  
 Ability: Protean  
 Level: 100  
 Shiny: Yes  
 Pokeball: Cherish Ball  
 EVs: 176 Atk / 80 SpA / 252 Spe  
 Hasty Nature  
 - Rock Slide  
 - U-turn  
 - Ice Beam  
 - Spikes
`);

const buffer = await summaryScreen(set);
```

Result:
![Greninja Static](https://cdn.discordapp.com/attachments/715564004621418577/850150281261481984/summary.jpg)


## Generate an animated summary

```ts
import { summaryScreen, partyScreen } from 'team-preview';

const buffer = await summaryScreen(set, { animated: true });
```


## Generate a static party preview


## Generate an animated party preview