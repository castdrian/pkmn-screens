import type { PokemonSet } from '@pkmn/sets';
import type { GenerationNum, Move } from '@pkmn/data';
import { Sprites } from '@pkmn/img';
import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';
import path from 'path';
import { Canvas, loadImage, FontLibrary, Image } from 'skia-canvas';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gifFrames from 'gif-frames';
import { tmpdir } from 'os';
import { createWriteStream } from 'fs';
import GIFEncoder from 'gifencoder';
import { writeFile } from 'fs/promises';

export async function summaryScreen(
  data: PokemonSet,
  anim?: boolean,
  pp?: number[],
): Promise<Buffer> {
  FontLibrary.use('gamefont', [
    path.join(__dirname, '../data/font/OpenSans-Semibold.ttf'),
  ]);

  const canvas = new Canvas(1200, 675);
  const ctx = canvas.getContext('2d');

  let { name, species, pokeball, gender, moves, level, shiny } = data;
  level || (level = 100);

  const gens = new Generations(Dex);
  const bg = await loadImage(
    path.join(__dirname, '../data/images/templates/summary_template.jpg'),
  );

  const movedata: Move[] = [];
  for (const item of moves) movedata.push(gens.get(8).moves.get(item) as Move);

  ctx.drawImage(bg, 0, 0);
  ctx.fillStyle = 'white';
  ctx.font = '25px gamefont';
  ctx.fillText(name !== '' ? name : species, 723, 60);
  ctx.fillText('Lv. ' + level, 963, 60);

  const defaultball = await loadImage(
    path.join(__dirname, '../data/images/icons/balls/pokeball.png'),
  );
  const ball = await loadImage(
    path.join(
      __dirname,
      `../data/images/icons/balls/${pokeball
        ?.replace(' ', '')
        .toLowerCase()}.png`,
    ),
  ).catch(() => defaultball);

  ctx.drawImage(ball, 618, 30, 45, 45);

  const male = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/male.png'),
  );
  const female = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/female.png'),
  );
  gender === 'M'
    ? ctx.drawImage(male, 1100, 40)
    : ctx.drawImage(female, 1100, 40);

  const Data: { [T in 'type1' | 'type2' | 'type3' | 'type4']?: Image } = {};

  for (let i = 0; i < movedata.length; i++)
    Data[`type${i + 1}` as 'type1'] = await loadImage(
      path.join(
        __dirname,
        `../data/images/icons/types/${movedata[i].type.toLowerCase()}.jpg`,
      ),
    );

  const arr = [
    {
      movey: 114,
      typey: 92,
      ppy: 114,
    },
    {
      movey: 174,
      typey: 150,
      ppy: 174,
    },
    {
      movey: 232,
      typey: 209,
      ppy: 232,
    },
    {
      movey: 289,
      typey: 267,
      ppy: 289,
    },
  ];

  const drawdata: {
    img: Image;
    movey: number;
    typey: number;
    ppy: number;
  }[] = [];

  for (let i = 0; i < moves.length; i++)
    drawdata.push({
      img: Data[`type${i + 1}` as 'type1'] as Image,
      movey: arr[i].movey,
      typey: arr[i].typey,
      ppy: arr[i].ppy,
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

export type Party<PokemonSet> = {
  0: PokemonSet;
  1: PokemonSet;
  2: PokemonSet;
  3: PokemonSet;
  4: PokemonSet;
  5: PokemonSet;
} & Array<PokemonSet>;

export async function partyScreen(
  data: Party<PokemonSet>,
  anim?: boolean,
): Promise<Buffer> {
  FontLibrary.use('gamefont', [
    path.join(__dirname, '../data/font/OpenSans-Semibold.ttf'),
  ]);

  const canvas = new Canvas(1200, 675);
  const ctx = canvas.getContext('2d');

  const gens = new Generations(Dex);
  const Gen = (num: GenerationNum) => gens.get(num);

  const bg = await loadImage(
    path.join(__dirname, '../data/images/templates/party_template.jpg'),
  );

  ctx.drawImage(bg, 0, 0);
  ctx.font = '25px gamefont';

  const male = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/male.png'),
  );
  const female = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/female.png'),
  );

  const { url } = Sprites.getPokemon(data[0].species, {
    gen: 'ani',
    shiny: data[0].shiny,
  });
  const sprite = await loadImage(url);

  const drawdata = [
    {
      color: 'white',
      species: { x: 135, y: 135 },
      lvl: { x: 315, y: 180 },
      icon: { x: 70, y: 115 },
      gender: { x: 315, y: 115 },
      hp: { x: 135, y: 180 },
    },
    {
      color: 'black',
      species: { x: 135, y: 225 },
      lvl: { x: 315, y: 270 },
      icon: { x: 70, y: 205 },
      gender: { x: 315, y: 205 },
      hp: { x: 135, y: 270 },
    },
    {
      color: 'black',
      species: { x: 135, y: 315 },
      lvl: { x: 315, y: 360 },
      icon: { x: 70, y: 295 },
      gender: { x: 315, y: 295 },
      hp: { x: 135, y: 360 },
    },
    {
      color: 'black',
      species: { x: 135, y: 405 },
      lvl: { x: 315, y: 450 },
      icon: { x: 70, y: 385 },
      gender: { x: 315, y: 385 },
      hp: { x: 135, y: 450 },
    },
    {
      color: 'black',
      species: { x: 135, y: 495 },
      lvl: { x: 315, y: 540 },
      icon: { x: 70, y: 475 },
      gender: { x: 315, y: 475 },
      hp: { x: 135, y: 540 },
    },
    {
      color: 'black',
      species: { x: 135, y: 585 },
      lvl: { x: 315, y: 630 },
      icon: { x: 70, y: 565 },
      gender: { x: 315, y: 565 },
      hp: { x: 135, y: 630 },
    },
  ];

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

async function generateGIF(
  buffer: Buffer,
  url: string,
  sprite: Image,
  x: number,
  y: number,
): Promise<Buffer> {
  const filename = `${tmpdir()}/${Math.random().toString()}_n.png`;
  await writeFile(filename, buffer);
  const gif = await gifFrames({ url, frames: 'all', outputType: 'png' });

  console.log('Extracting frames...');
  const images = await Promise.all(
    gif.map((img: any, index: number) => {
      const file = filename.replace('_n', `_${index}`);
      const stream = createWriteStream(file);
      img.getImage().pipe(stream);
      // eslint-disable-next-line promise/param-names
      return new Promise<string>((res) => stream.on('finish', () => res(file)));
    }),
  );

  console.log('Generating GIF...');

  const GIF = new GIFEncoder(1200, 675);
  GIF.start();
  GIF.setRepeat(0);

  for (const image of images) {
    console.log(
      `Drawing frame ${images.indexOf(image)} of ${images.length}...`,
    );
    const canvas = new Canvas(1200, 675);
    const bg = await loadImage(filename);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(
      await loadImage(image),
      x,
      y,
      sprite.width * 3,
      sprite.height * 3,
    );
    GIF.addFrame(ctx as any);
  }

  return GIF.out.getData();
}
