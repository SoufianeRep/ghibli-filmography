import { ChangeEvent, Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';

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
  people: string[]; // An array of IDs representing people associated with the film
};

export type FilmItem = {
  id: string;
  title: string;
  releaseDate: string;
  runningTime: string;
  image: string;
};

export interface GhibliContextState {
  films: FilmItem[]; // An array of film items
  film: Film; // A single film object
  isLoading: boolean; // Flag indicating if data is being loaded
  dispatch: Dispatch<unknown>; // Dispatch function for context actions
}

export type ChildrenProps = {
  children: ReactNode; // Child components to render
};

export interface GhibliContextAction {
  type: string; // Action type
  payload?: unknown; // Action payload (optional)
}

export interface SearchBarProps {
  searchValue: string; // Current search value
  setSearchValue: Dispatch<SetStateAction<string>>; // Function to update the search value
  handleCriteriaChange: (e: ChangeEvent<HTMLSelectElement>) => void; // Event handler for criteria change
  handleSearch: (e: FormEvent<HTMLFormElement>) => void; // Event handler for search submission
}

export interface PaginationProps {
  filmsPerPage: number; // Number of films to display per page
  totalFilms: number; // Total number of films
  handlePaginate: (pageNumber: number) => void; // Function to handle pagination
  handleNext: () => void; // Function to handle next page navigation
  handlePrev: () => void; // Function to handle previous page navigation
}
