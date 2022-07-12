# pkmn-screens
Pokémon screen image generator

## Install

Install pkmn-screens:
```
npm i pkmn-screens
```

### Generate a summary

<details>
  <summary>Static move screen</summary>
  
```ts
import { Sets } from '@pkmn/sets';
import { Screens } from 'pkmn-screens';

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

const buffer = await Screens.moves({ data: set, anim: false });
```

Result:
![Summary](https://cdn.discordapp.com/attachments/715564004621418577/852590843357691977/summary.jpg)
</details>

<details>
  <summary>Animated move screen</summary>
  
```diff
import { Sets } from '@pkmn/sets';
import { Screens } from 'pkmn-screens';

//Pokémon Showdown! set
const set = Sets.importSet(
`Yveltal @ Heavy-Duty Boots
 Ability: Dark Aura
 Level: 100
 Shiny: Yes
 EVs: 16 HP / 240 SpD / 252 Spe
 Jolly Nature
 - Knock Off
 - Taunt
 - Defog
 - Roost
`);

- const buffer = await Screens.moves({ data: set, anim: false });
+ const buffer = await Screens.moves({ data: set, anim: true });
```

Result: https://i.imgur.com/snFal5k.gif
</details>

### Generate a party preview

<details>
  <summary>Static party preview</summary>
  
  ```ts
import { summaryScreen, partyScreen } from 'pkmn-screens';

//array of 6 sets
const buffer = await Screens.party({
    data: team.map((s) => Sets.importSet(s)),
    anim: false,
  });
```

Result:
![Party](https://cdn.discordapp.com/attachments/715564004621418577/852597065372532747/party.jpg)
</details>

<details>
  <summary>Animated party preview</summary>
  
```diff
import { summaryScreen, partyScreen } from 'pkmn-screens';

//array of 6 sets
- const buffer = await Screens.party({
-    data: team.map((s) => Sets.importSet(s)),
-    anim: false,
-  });
+ const buffer = await Screens.party({
+   data: team.map((s) => Sets.importSet(s)),
+   anim: true,
+ });
```

Result: https://i.imgur.com/AtQ2bGK.gif
</details>



### Donations

Donations are gladly accepted. Please send them to my [Paypal.me](https://www.paypal.me/adrifcastr)
to support the development, and maintenance of this project. Thank you!


### Credits

This project currently being owned and maintained by __castdrian.__
