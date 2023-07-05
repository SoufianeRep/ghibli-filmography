/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Film } from '../@types/CommonTypes';
import { toHouresAndMinutes } from '../utils/helpers';

const FilmCard: FC<Film> = ({ title, image, releaseDate, runningTime }) => {
  return (
    <div className='w-80 flex flex-col max-w-md bg-gray-800 shadow-xl card rounded-lg overflow-hidden'>
      <div className='w-1/3'>
        <figure className='w-80'>
          <img src={`${image}`} alt={`${title} poster`} />
        </figure>
      </div>
      <div className='p-4 text-white'>
        <div className='text-2xl font-medium mb-4'>
          <h2 className='overflow-hidden text-ellipsis'>{title}</h2>
        </div>
        <div className='flex justify-start gap-3'>
          <span className='dark-pill'>{toHouresAndMinutes(runningTime)}</span>
          <span className='indigo-pill'>{releaseDate}</span>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
