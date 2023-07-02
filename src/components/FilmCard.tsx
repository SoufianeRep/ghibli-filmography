/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Film } from '../@types/CommonTypes';
import { toHouresAndMinutes } from '../utils/helpers';

const film = {
  title: 'Castle in the Sky',
  releaseDate: '1986',
  runningTime: '125',
  image:
    'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg',
};
// @ts-ignore
const FilmCard: FC<Film> = ({ title, image, releaseDate, runningTime }) => {
  const film = {
    title: 'Castle in the Sky',
    releaseDate: '1986',
    runningTime: '125',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg',
  };

  return (
    <div className='flex max-w-md bg-gray-800 shadow-2xl card rounded-lg overflow-hidden'>
      <div className='w-1/3'>
        <figure>
          <img src={`${film.image}`} alt={`${film.title} poster`} />
        </figure>
      </div>
      <div className='p-4 text-white'>
        <div className='text-3xl italic font-medium'>
          <h2>{film.title}</h2>
        </div>
        <div className='flex flex-col'>
          <span>Release Year: {film.releaseDate}</span>
          <span>Length: {toHouresAndMinutes(film.runningTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
