import { Generations, Move } from '@pkmn/data';
import { Sprites } from '@pkmn/img';
import { Dex } from '@pkmn/dex';
import { PokemonSet } from '@pkmn/sets';
import path from 'path';
import { FontLibrary, Canvas, loadImage, type Image } from 'skia-canvas';
import { IconData, drawobj } from '../@types';
import { movexy } from '../constants';
import { generateGIF } from '../util';

export async function moveScreen(
  data: PokemonSet,
  anim?: boolean,
  pp?: number[],
): Promise<Buffer> {
  FontLibrary.use('gamefont', [
    path.join(__dirname, '../../data/font/OpenSans-Semibold.ttf'),
  ]);

  const canvas = new Canvas(1200, 675);
  const ctx = canvas.getContext('2d');

  let { name, species, pokeball, gender, moves, level, shiny } = data;
  level || (level = 100);

  const gens = new Generations(Dex);
  const bg = await loadImage(
    path.join(__dirname, '../../data/images/templates/summary_template.jpg'),
  );

  const movedata: Move[] = [];
  for (const item of moves) movedata.push(gens.get(8).moves.get(item) as Move);

  ctx.drawImage(bg, 0, 0);
  ctx.fillStyle = 'white';
  ctx.font = '25px gamefont';
  ctx.fillText(name !== '' ? name : species, 723, 60);
  ctx.fillText('Lv. ' + level, 963, 60);

  const defaultball = await loadImage(
    path.join(__dirname, '../../data/images/icons/balls/pokeball.png'),
  );
  const ball = await loadImage(
    path.join(
      __dirname,
      `../../data/images/icons/balls/${pokeball
        ?.replace(' ', '')
        .toLowerCase()}.png`,
    ),
  ).catch(() => defaultball);

  ctx.drawImage(ball, 618, 30, 45, 45);

  const male = await loadImage(
    path.join(__dirname, '../../data/images/icons/genders/male.png'),
  );
  const female = await loadImage(
    path.join(__dirname, '../../data/images/icons/genders/female.png'),
  );
  gender === 'M'
    ? ctx.drawImage(male, 1100, 40)
    : ctx.drawImage(female, 1100, 40);

  const Data: IconData = {};

  for (let i = 0; i < movedata.length; i++)
    Data[`type${i + 1}` as 'type1'] = await loadImage(
      path.join(
        __dirname,
        `../../data/images/icons/types/${movedata[i].type.toLowerCase()}.jpg`,
      ),
    );

  const drawdata: drawobj[] = [];

  for (let i = 0; i < moves.length; i++)
    drawdata.push({
      img: Data[`type${i + 1}` as 'type1'] as Image,
      movey: movexy[i].movey,
      typey: movexy[i].typey,
      ppy: movexy[i].ppy,
    });

  for (let i = 0; i < moves.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(movedata[i].name, 66, drawdata[i].movey);
    ctx.drawImage(drawdata[i].img, 320, drawdata[i].typey, 125, 28);
    ctx.fillStyle = 'white';
    ctx.fillText(
      (pp && pp[i] ? pp[i] : movedata[i].pp) + '/' + movedata[i].pp,
      480,
      drawdata[i].ppy,
    );
  }

  const { url } = Sprites.getPokemon(data.species, { gen: 'ani', shiny });
  const sprite = await loadImage(url);

  if (!anim)
    ctx.drawImage(sprite, 600, 100, sprite.width * 3, sprite.height * 3);
  const buffer = await canvas.toBuffer('png');

  if (anim) return generateGIF(buffer, url, sprite, 600, 100);
  else {
    return buffer;
  }
}
