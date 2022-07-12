import type { PokemonSet } from '@pkmn/sets';
import type { GenerationNum } from '@pkmn/data';
import { Sprites } from '@pkmn/img';
import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';
import path from 'path';
import { Canvas, loadImage, FontLibrary } from 'skia-canvas';
import { drawdata } from '../constants';
import { generateGIF } from '../util';
import type { Party } from '../@types';

export async function partyScreen(
  data: Party<PokemonSet>,
  anim?: boolean,
): Promise<Buffer> {
  FontLibrary.use('gamefont', [
    path.join(__dirname, '../../data/font/OpenSans-Semibold.ttf'),
  ]);

  const canvas = new Canvas(1200, 675);
  const ctx = canvas.getContext('2d');

  const gens = new Generations(Dex);
  const Gen = (num: GenerationNum) => gens.get(num);

  const bg = await loadImage(
    path.join(__dirname, '../../data/images/templates/party_template.jpg'),
  );

  ctx.drawImage(bg, 0, 0);
  ctx.font = '25px gamefont';

  const male = await loadImage(
    path.join(__dirname, '../../data/images/icons/genders/male.png'),
  );
  const female = await loadImage(
    path.join(__dirname, '../../data/images/icons/genders/female.png'),
  );

  const { url } = Sprites.getPokemon(data[0].species, {
    gen: 'ani',
    shiny: data[0].shiny,
  });
  const sprite = await loadImage(url);

  for (let i = 0; i < data.length; i++) {
    let { name, species, gender, level } = data[i];
    level || (level = 100);

    ctx.fillStyle = drawdata[i].color;
    ctx.fillText(
      name !== '' ? name : species,
      drawdata[i].species.x,
      drawdata[i].species.y,
    );
    ctx.fillText('Lv. ' + level, drawdata[i].lvl.x, drawdata[i].lvl.y);
    const icon = await loadImage(
      `https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular/${data[
        i
      ].species.toLowerCase()}.png`,
    )
      .catch(() =>
        loadImage(
          `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${data[
            i
          ].species.toLowerCase()}.png`,
        ),
      )
      .catch(() =>
        loadImage(
          `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${data[
            i
          ].species.toLowerCase()}.png`,
        ),
      );

    ctx.drawImage(
      icon,
      drawdata[i].icon.x,
      drawdata[i].icon.y,
      icon.width * 1.5,
      icon.height * 1.5,
    );
    gender === 'M'
      ? ctx.drawImage(male, drawdata[i].gender.x, drawdata[i].gender.y)
      : ctx.drawImage(female, drawdata[i].gender.x, drawdata[i].gender.y);

    const base =
      Gen(8).species.get(data[i].species)?.baseStats ??
      Gen(7).species.get(data[i].species)?.baseStats;
    const nature = Gen(8).natures.get(data[i].nature);
    const hp = Gen(8).stats.calc(
      'hp',
      base?.hp as number,
      31,
      data[i].evs.hp,
      data[i].level,
      nature,
    );

    ctx.fillText(hp + '/' + hp, drawdata[i].hp.x, drawdata[i].hp.y);
  }

  if (!anim)
    ctx.drawImage(sprite, 600, 100, sprite.width * 3, sprite.height * 3);
  const buffer = await canvas.toBuffer('png');

  if (anim) return generateGIF(buffer, url, sprite, 600, 100);
  else {
    return buffer;
  }
}
