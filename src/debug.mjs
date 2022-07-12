import { Sets } from '@pkmn/sets';
import { Screens } from '../dist/index.js';
import { writeFile, mkdir } from 'fs/promises';

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
`,
);

const team = [
  `Yveltal @ Heavy-Duty Boots
Ability: Dark Aura
Level: 100
Shiny: Yes
EVs: 16 HP / 240 SpD / 252 Spe
Jolly Nature
- Knock Off
- Taunt
- Defog
- Roost`,

  `Xerneas @ Power Herb
Ability: Fairy Aura
Level: 100
Shiny: Yes
EVs: 168 Def / 252 SpA / 88 Spe
Modest Nature
- Geomancy
- Moonblast
- Thunder
- Substitute`,

  `Tornadus (M) @ Zoom Lens
Ability: Regenerator
Level: 100
Shiny: Yes
EVs: 4 HP / 252 SpA / 252 Spe
Timid Nature
IVs: 0 Atk
- Hurricane
- Heat Wave
- Grass Knot
- Nasty Plot`,

  `Melmetal @ Choice Band
Ability: Iron Fist
Level: 100
Shiny: Yes
EVs: 252 HP / 252 Atk / 4 Def
Adamant Nature
- Double Iron Bash
- Darkest Lariat
- Body Press
- Ice Punch`,

  `Mew @ Leftovers
Ability: Synchronize
Level: 100
Shiny: Yes
EVs: 252 HP / 128 Def / 128 SpD
Jolly Nature
- Stealth Rock
- Defog
- Fake Out
- Heal Bell`,

  `Volcarona @ Leftovers
Ability: Flame Body
Level: 100
Shiny: Yes
EVs: 4 HP / 252 SpA / 252 Spe
Timid Nature
IVs: 0 Atk
- Bug Buzz
- Fiery Dance
-Quiver Dance
-Giga Drain`,
];

async function gen() {
  await mkdir('out', { recursive: true });

  console.log('Generating static moves screen...');
  const moves = await Screens.moves({ data: set, anim: false });
  await writeFile('./out/moves.png', moves);

  console.log('Generating static party screen...');
  const party = await Screens.party({
    data: team.map((s) => Sets.importSet(s)),
    anim: false,
  });
  await writeFile('./out/party.png', party);

  console.log('Generating animated moves screen...');
  const movesAnim = await Screens.moves({ data: set, anim: true });
  await writeFile('./out/moves-animated.gif', movesAnim);

  console.log('Generating animated party screen...');
  const partyAnim = await Screens.party({
    data: team.map((s) => Sets.importSet(s)),
    anim: true,
  });
  await writeFile('./out/party-animated.gif', partyAnim);
}

(async function main() {
  try {
    console.log('Generating images...');
    await gen();
    console.log('Done!');
  } catch (e) {
    console.error(e);
  }
})();
