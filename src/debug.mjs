import { Sets } from '@pkmn/sets';
import { summaryScreen, partyScreen } from '../dist/index.js';
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

  console.log('Generating static summary screen...');
  const summary = await summaryScreen(set);
  await writeFile('./out/summary.png', summary);

  console.log('Generating static party screen...');
  const party = await partyScreen(team.map((s) => Sets.importSet(s)));
  await writeFile('./out/party.png', party);

  console.log('Generating animated summary screen...');
  const summaryAnimated = await summaryScreen(set, true);
  await writeFile('./out/summary-animated.gif', summaryAnimated);

  console.log('Generating animated party screen...');
  const partyAnimated = await partyScreen(
    team.map((s) => Sets.importSet(s)),
    true,
  );
  await writeFile('./out/party-animated.gif', partyAnimated);
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
