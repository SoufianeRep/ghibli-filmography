import axios from "axios";
import {camelizeKeys} from "humps";
import { Film, FilmItem } from '../../@types/CommonTypes'

const ghibli = axios.create({
  baseURL: "https://ghibliapi.vercel.app"
});

export const getFilms = async (): Promise<FilmItem[]> => {
  const response = await ghibli.get("/films");
  const filmsData = camelizeKeys(response.data) as FilmItem[]
  return filmsData;
}

export const getFilm = async (id: string | undefined): Promise<Film>  => {
  const response = await ghibli.get(`/films/${id}`);
  const filmData = camelizeKeys(response.data) as Film;
  return filmData;
}

export const getFilmPeople = async (urls: string[] | undefined) => {
  if (!urls) return [];

  const requests = urls.map((url) => axios.get(url));
  const response = await Promise.all(requests);
  return response;
}
