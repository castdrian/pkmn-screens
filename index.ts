import type { PokemonSet } from '@pkmn/sets'
import type { GenerationNum, Move } from '@pkmn/data'
import { Sprites, Icons } from '@pkmn/img'
import { Dex } from '@pkmn/dex'
import { Generations } from '@pkmn/data'
import path from 'path'
import { Canvas, loadImage, FontLibrary, Image } from 'skia-canvas'

export async function summaryScreen(data: PokemonSet, pp?: number[]): Promise<Buffer> {
  FontLibrary.use('gamefont', [
    path.join(__dirname, '../data/font/OpenSans-Semibold.ttf'),
  ])

  const canvas = new Canvas(1200, 675),
    ctx = canvas.getContext('2d')

  let { name, species, pokeball, gender, moves, level, shiny } = data
  level ? (level = level) : (level = 100)

  const gens = new Generations(Dex)
  const bg = await loadImage(
    path.join(__dirname, '../data/images/templates/summary_template.jpg')
  )

  let movedata: Move[] = []
  for (const item of moves) movedata.push(gens.get(8).moves.get(item) as Move)

  ctx.drawImage(bg, 0, 0)
  ctx.fillStyle = 'white'
  ctx.font = '25px gamefont'
  ctx.fillText(name !== '' ? name : species, 723, 60)
  ctx.fillText('Lv. ' + level, 963, 60)

  const defaultball = await loadImage(
    path.join(__dirname, '../data/images/icons/balls/pokeball.png')
  )
  const ball = await loadImage(
    path.join(
      __dirname,
      `../data/images/icons/balls/${pokeball
        ?.replace(' ', '')
        .toLowerCase()}.png`
    )
  )
  pokeball
    ? ctx.drawImage(ball, 618, 30, 45, 45)
    : ctx.drawImage(defaultball, 618, 30, 45, 45)

  const male = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/male.png')
  )
  const female = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/female.png')
  )
  gender === 'M'
    ? ctx.drawImage(male, 1100, 40)
    : ctx.drawImage(female, 1100, 40)

  const Data: { [T in 'type1' | 'type2' | 'type3' | 'type4']?: Image } = {}

  for (let i = 0; i < movedata.length; i++)
    Data[`type${i + 1}` as 'type1'] = await loadImage(
      path.join(
        __dirname,
        `../data/images/icons/types/${movedata[i].type.toLowerCase()}.jpg`
      )
    )

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
  ]

  const drawdata: {
    img: Image
    movey: number
    typey: number
    ppy: number
  }[] = []

  for (let i = 0; i < moves.length; i++)
    drawdata.push({
      img: Data[`type${i + 1}` as 'type1'] as Image,
      movey: arr[i].movey,
      typey: arr[i].typey,
      ppy: arr[i].ppy,
    })

  for (let i = 0; i < moves.length; i++) {
    ctx.fillStyle = 'black'
    ctx.fillText(movedata[i].name, 66, drawdata[i].movey)
    ctx.drawImage(drawdata[i].img, 320, drawdata[i].typey, 125, 28)
    ctx.fillStyle = 'white'
    ctx.fillText((pp && pp[i] ? pp[i] : movedata[i].pp) + '/' + movedata[i].pp, 480, drawdata[i].ppy)
  }

  const { url } = Sprites.getPokemon(data.species, { gen: 'ani', shiny })
  const sprite = await loadImage(url)
  ctx.drawImage(sprite, 720, 250, sprite.width * 3, sprite.height * 3)

  return canvas.toBuffer('jpg')
}

export type Party<PokemonSet> = {
  0: PokemonSet
  1: PokemonSet
  2: PokemonSet
  3: PokemonSet
  4: PokemonSet
  5: PokemonSet
} & Array<PokemonSet>

export async function partyScreen(data: Party<PokemonSet>): Promise<Buffer> {
  FontLibrary.use('gamefont', [
    path.join(__dirname, '../data/font/OpenSans-Semibold.ttf'),
  ])

  const canvas = new Canvas(1200, 675),
    ctx = canvas.getContext('2d')

  const gens = new Generations(Dex)
  const Gen = (num: GenerationNum) => gens.get(num)

  const bg = await loadImage(
    path.join(__dirname, '../data/images/templates/party_template.jpg')
  )

  ctx.drawImage(bg, 0, 0)
  ctx.font = '25px gamefont'

  const male = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/male.png')
  )
  const female = await loadImage(
    path.join(__dirname, '../data/images/icons/genders/female.png')
  )

  const { url } = Sprites.getPokemon(data[0].species, {
    gen: 'ani',
    shiny: data[0].shiny,
  })
  const sprite = await loadImage(url)

  const drawdata = [
    {
      color: 'white',
      species: { x: 135, y: 135 },
      lvl: { x: 315, y: 180 },
      icon: { x: 50, y: 95 },
      gender: { x: 315, y: 115 },
      hp: { x: 135, y: 180 },
    },
    {
      color: 'black',
      species: { x: 135, y: 225 },
      lvl: { x: 315, y: 270 },
      icon: { x: 50, y: 185 },
      gender: { x: 315, y: 205 },
      hp: { x: 135, y: 270 },
    },
    {
      color: 'black',
      species: { x: 135, y: 315 },
      lvl: { x: 315, y: 360 },
      icon: { x: 50, y: 275 },
      gender: { x: 315, y: 295 },
      hp: { x: 135, y: 360 },
    },
    {
      color: 'black',
      species: { x: 135, y: 405 },
      lvl: { x: 315, y: 450 },
      icon: { x: 50, y: 365 },
      gender: { x: 315, y: 385 },
      hp: { x: 135, y: 450 },
    },
    {
      color: 'black',
      species: { x: 135, y: 495 },
      lvl: { x: 315, y: 540 },
      icon: { x: 50, y: 455 },
      gender: { x: 315, y: 475 },
      hp: { x: 135, y: 540 },
    },
    {
      color: 'black',
      species: { x: 135, y: 585 },
      lvl: { x: 315, y: 630 },
      icon: { x: 50, y: 545 },
      gender: { x: 315, y: 565 },
      hp: { x: 135, y: 630 },
    },
  ]

  for (let i = 0; i < data.length; i++) {
    let { name, species, gender, level } = data[i]
    level ? (level = level) : (level = 100)

    ctx.fillStyle = drawdata[i].color
    ctx.fillText(
      name !== '' ? name : species,
      drawdata[i].species.x,
      drawdata[i].species.y
    )
    ctx.fillText('Lv. ' + level, drawdata[i].lvl.x, drawdata[i].lvl.y)
    let icon = await loadImage(Icons.getPokemon(data[i].species).url)
    ctx.drawImage(
      icon,
      drawdata[i].icon.x,
      drawdata[i].icon.y,
      icon.width * 1.5,
      icon.height * 1.5
    )
    gender === 'M'
      ? ctx.drawImage(male, drawdata[i].gender.x, drawdata[i].gender.y)
      : ctx.drawImage(female, drawdata[i].gender.x, drawdata[i].gender.y)

    const base =
      Gen(8).species.get(data[i].species)?.baseStats ??
      Gen(7).species.get(data[i].species)?.baseStats
    const nature = Gen(8).natures.get(data[i].nature)
    let hp = Gen(8).stats.calc(
      'hp',
      base?.hp as number,
      31,
      data[i].evs.hp,
      data[i].level,
      nature
    )

    ctx.fillText(hp + '/' + hp, drawdata[i].hp.x, drawdata[i].hp.y)
  }

  ctx.drawImage(sprite, 725, 270, sprite.width * 3, sprite.height * 3)

  return canvas.toBuffer('jpg')
}