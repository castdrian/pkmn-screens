import type { Image } from 'skia-canvas';

export type Party<PokemonSet> = {
  0: PokemonSet;
  1: PokemonSet;
  2: PokemonSet;
  3: PokemonSet;
  4: PokemonSet;
  5: PokemonSet;
} & Array<PokemonSet>;

export type drawobj = {
  img: Image;
  movey: number;
  typey: number;
  ppy: number;
};

export type IconData = { [T in 'type1' | 'type2' | 'type3' | 'type4']?: Image };

export interface MoveArgs {
  data: PokemonSet;
  anim?: boolean;
}

export interface PartyArgs {
  data: Party<PokemonSet>;
  anim?: boolean;
}
