import axios from "axios";

const ghibli = axios.create({
  baseURL: "https://ghibliapi.vercel.app"
})

export const getFilms = async () => {
  const response = await ghibli.get("/films")
  return response.data;
}

export const getFilm = async (id: string) => {
  const response = await ghibli.get(`/films/${id}`)
  return response.data;
}
