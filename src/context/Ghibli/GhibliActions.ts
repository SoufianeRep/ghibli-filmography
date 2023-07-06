import axios from "axios";
import {camelizeKeys} from "humps";
import { Film, FilmItem } from '../../@types/CommonTypes'

const ghibli = axios.create({
  baseURL: "https://ghibliapi.vercel.app"
});

/**
* Retrieves a list of films from the Ghibli API.
* @returns A Promise resolving to an array of FilmItem objects.
*/
export const getFilms = async (): Promise<FilmItem[]> => {
  const response = await ghibli.get("/films");
  const filmsData = camelizeKeys(response.data) as FilmItem[]
  return filmsData;
}

/**
* Retrieves details of a specific film from the Ghibli API.
* @param id - The ID of the film.
* @returns A Promise resolving to a Film object.
*/
export const getFilm = async (id: string | undefined): Promise<Film>  => {
  const response = await ghibli.get(`/films/${id}`);
  const filmData = camelizeKeys(response.data) as Film;
  return filmData;
}

/**
 * Retrieves details of people associated with the given URLs from the Ghibli API.
 * @param urls An array of URLs representing people associated with a film.
 * @returns A Promise resolving to an array of response objects.
 */
export const getFilmPeople = async (urls: string[] | undefined) => {
  if (!urls) return [];

  const requests = urls.map((url) => axios.get(url));
  const response = await Promise.all(requests);
  return response;
}
