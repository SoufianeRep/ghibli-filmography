import { Reducer } from 'react'


export type Film = {
  title: string;
  originalTitle: string;
  titleRomanized: string;
  description: string;
  director: string;
  producer: string;
  releaseDate: string;
  runningTime: string;
  image: string;
  people: string[];
}

export type FilmItem = {
  title: string;
  releaseDate: string;
  runningTime: string;
  image: string;
}

export interface GhibliContextState {
  films: FilmItem[];
  film?: Film | null;
  isLoading: boolean;
}

export interface GhibliContextAction {
  type: string
  payload?: any;
}
