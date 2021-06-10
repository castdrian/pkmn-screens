import type { PokemonSet } from '@pkmn/sets';
import type { GenerationNum, Move } from '@pkmn/data';
import type { Image } from 'skia-canvas';
import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';
import path from 'path';
import { Canvas, loadImage, FontLibrary } from 'skia-canvas';

export async function  summaryScreen(data: PokemonSet): Promise<Buffer> {
	FontLibrary.use('gamefont', [
		path.join(__dirname, '../data/font/OpenSans-Semibold.ttf')
	]);

	const canvas = new Canvas(1200, 675),
    ctx = canvas.getContext("2d");

	let { name, species, pokeball, gender, moves, level, shiny } = data;
	level ? level = level : level = 100;

	const gens = new Generations(Dex);

	const bg = await loadImage(path.join(__dirname, '../data/images/templates/summary_template.jpg'));

	let movedata: Move[] = [];
	for (const item of moves) {
		movedata.push(gens.get(8).moves.get(item) as Move);
	}
	
	ctx.drawImage(bg, 0, 0);
	ctx.fillStyle = 'white';
	ctx.font = '25px gamefont'
	ctx.fillText(name !== '' ? name : species, 723, 60);
	ctx.fillText('Lv. ' + level, 963, 60);

	if (pokeball) {
		const ball = await loadImage(path.join(__dirname, `../data/images/icons/balls/${pokeball.replace(' ', '').toLowerCase()}.png`));
		ctx.drawImage(ball, 618, 30, 45, 45);
	} else {
		const ball = await loadImage(path.join(__dirname, '../data/images/icons/balls/pokeball.png'));
		ctx.drawImage(ball, 618, 30, 45, 45);
	}

	if (gender === 'M') {
		const male = await loadImage(path.join(__dirname, '../data/images/icons/genders/male.png'));
		ctx.drawImage(male, 1100, 40);
	} else if (gender === 'F') {
		const female = await loadImage(path.join(__dirname, '../data/images/icons/genders/female.png'));
		ctx.drawImage(female, 1100, 40);
	}

	ctx.fillStyle = 'black';
	ctx.fillText(movedata[0].name, 66, 114);
	ctx.fillText(movedata[1].name, 66, 174);
	ctx.fillText(movedata[2].name, 66, 232);
	ctx.fillText(movedata[3].name, 66, 289);

	const type1 = await loadImage(path.join(__dirname, `../data/images/icons/types/${movedata[0].type.toLowerCase()}.jpg`));
	const type2 = await loadImage(path.join(__dirname, `../data/images/icons/types/${movedata[1].type.toLowerCase()}.jpg`));
	const type3 = await loadImage(path.join(__dirname, `../data/images/icons/types/${movedata[2].type.toLowerCase()}.jpg`));
	const type4 = await loadImage(path.join(__dirname, `../data/images/icons/types/${movedata[3].type.toLowerCase()}.jpg`));

	ctx.drawImage(type1, 320, 92, 125, 28);
	ctx.drawImage(type2, 320, 150, 125, 28);
	ctx.drawImage(type3, 320, 209, 125, 28);
	ctx.drawImage(type4, 320, 267, 125, 28);

	ctx.fillStyle = 'white';
	ctx.fillText(movedata[0].pp + '/' + movedata[0].pp, 480, 114);
	ctx.fillText(movedata[1].pp + '/' + movedata[1].pp, 480, 174);
	ctx.fillText(movedata[2].pp + '/' + movedata[2].pp, 480, 232);
	ctx.fillText(movedata[3].pp + '/' + movedata[3].pp, 480, 289);

	let sprite: Image;
	if (shiny) sprite = await loadImage(`https://play.pokemonshowdown.com/sprites/ani-shiny/${species.toLowerCase()}.gif`);
	else sprite = await loadImage(`https://play.pokemonshowdown.com/sprites/ani/${species.toLowerCase()}.gif`);
	
	ctx.drawImage(sprite, 720, 250, sprite.width*3, sprite.height*3);

	return canvas.toBuffer('jpg');
}

type Party<T> = { 0: T, 1: T, 2: T, 3: T, 4: T, 5: T } & Array<T>

export async function partyScreen(data: Party<PokemonSet>): Promise<Buffer> {
	FontLibrary.use('gamefont', [
		path.join(__dirname, '../data/font/OpenSans-Semibold.ttf')
	]);

	const canvas = new Canvas(1200, 675),
    ctx = canvas.getContext("2d");

	const gens = new Generations(Dex);
    const Gen = (num: GenerationNum) => gens.get(num);

	const bg = await loadImage(path.join(__dirname, '../data/images/templates/party_template.jpg'));

	ctx.drawImage(bg, 0, 0);
	ctx.font = '25px gamefont'

	const male = await loadImage(path.join(__dirname, '../data/images/icons/genders/male.png'));
	const female = await loadImage(path.join(__dirname, '../data/images/icons/genders/female.png'));

	let sprite = await loadImage(`https://play.pokemonshowdown.com/sprites/ani-shiny/${data[0].species.toLowerCase()}.gif`);

	const drawdata = 
	[
		{ 
			color: 'white', species: { x: 135, y: 135 },
			lvl: { x: 315, y: 180 }, icon: { x: 50, y: 95 },
			gender: { x: 315, y: 115 }, hp: { x: 135, y: 180 }
		},
		{ 
			color: 'black', species: { x: 135, y: 225 },
			lvl: { x: 315, y: 270 }, icon: { x: 50, y: 185 },
			gender: { x: 315, y: 205 }, hp: { x: 135, y: 270 }
		},
		{ 
			color: 'black', species: { x: 135, y: 315 },
			lvl: { x: 315, y: 360 }, icon: { x: 50, y: 275 },
			gender: { x: 315, y: 295 }, hp: { x: 135, y: 360 }
		},
		{ 
			color: 'black', species: { x: 135, y: 405 },
			lvl: { x: 315, y: 450 }, icon: { x: 50, y: 365 },
			gender: { x: 315, y: 385 }, hp: { x: 135, y: 450 }
		},
		{ 
			color: 'black', species: { x: 135, y: 495 },
			lvl: { x: 315, y: 540 }, icon: { x: 50, y: 455 },
			gender: { x: 315, y: 475 }, hp: { x: 135, y: 540 }
		},
		{ 
			color: 'black', species: { x: 135, y: 585 },
			lvl: { x: 315, y: 630 }, icon: { x: 50, y: 545 },
			gender: { x: 315, y: 565 }, hp: { x: 135, y: 630 }
		},
	];

	for (let i = 0; i < drawdata.length ; i++) {
		let { name, species, gender, level } = data[i];
		level ? level = level : level = 100;

		ctx.fillStyle = drawdata[i].color;
		ctx.fillText(name !== '' ? name : species, drawdata[i].species.x, drawdata[i].species.y);
		ctx.fillText('Lv. ' + level, drawdata[i].lvl.x, drawdata[i].lvl.y);
		let icon = await loadImage(`https://github.com/itsjavi/pokemon-assets/raw/master/assets/img/pokemon/${data[i].species.toLowerCase()}.png`);
		ctx.drawImage(icon, drawdata[i].icon.x, drawdata[i].icon.y, icon.width*1.5, icon.height*1.5);

		if (gender === 'M') ctx.drawImage(male, drawdata[i].gender.x, drawdata[i].gender.y);
		else if (gender === 'F') ctx.drawImage(female, drawdata[i].gender.x, drawdata[i].gender.y);

		const base = Gen(8).species.get(data[i].species)?.baseStats ?? Gen(7).species.get(data[i].species)?.baseStats;
		const nature = Gen(8).natures.get(data[i].nature);
		const hp = Gen(8).stats.calc('hp', base?.hp as number, 31, data[i].evs.hp, data[i].level, nature);

		ctx.fillText(hp + '/' + hp, drawdata[i].hp.x, drawdata[i].hp.y);
	}

	ctx.drawImage(sprite, 725, 270, sprite.width*3, sprite.height*3);

	return canvas.toBuffer('jpg');
}