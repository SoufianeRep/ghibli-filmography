import axios from "axios";
import {camelizeKeys} from "humps"

const ghibli = axios.create({
  baseURL: "https://ghibliapi.vercel.app"
})

export const getFilms = async () => {
  const response = await ghibli.get("/films")
  return camelizeKeys(response.data);
}

export const getFilm = async (id: string) => {
  const response = await ghibli.get(`/films/${id}`)
  return camelizeKeys(response.data);
}
