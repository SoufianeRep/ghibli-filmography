import { ChangeEvent, Dispatch, FormEvent, Reducer, SetStateAction } from 'react'


export type Film = {
  id?: string;
  title: string;
  originalTitle?: string;
  originalTitleRomanised?: string;
  description?: string;
  director?: string;
  producer?: string;
  releaseDate: string;
  runningTime: string;
  image: string;
  people?: string[];
}

export type FilmItem = {
  id: string;
  title: string;
  releaseDate: string;
  runningTime: string;
  image: string;
}

export interface GhibliContextState {
  films: FilmItem[];
  film: Film | null;
  isLoading: boolean;
  dispatch: Dispatch<unknown>;
}

export interface GhibliContextAction {
  type: string
  payload?: unknown;
}

export interface SearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleCriteriaChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}
