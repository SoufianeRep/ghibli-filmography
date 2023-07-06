/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Film } from '../@types/CommonTypes';
import { toHouresAndMinutes } from '../utils/helpers';

const FilmCard: FC<Film> = ({ title, image, releaseDate, runningTime }) => {
  return (
    <div
      className='md:w-64 lg:w-56 flex flex-col items-stretch max-w-md border-gray-950 bg-gray-900 shadow-xl card rounded-lg overflow-hidden'
      data-cy='film-item'
    >
      <div className='self-stretch'>
        <div className='h-2/3'>
          <figure className='w-auto min-w-auto md:w-64 lg:w-56'>
            <img src={`${image}`} alt={`${title} poster`} />
          </figure>
        </div>
        <div className='md:h-24 p-3 text-white flex-grow-1 flex flex-col justify-between'>
          <div className='mb-3 leading-1 whitespace-no-wrap overflow-hidden text-ellipsis font-medium text-3xl md:text-xl md:font-small md:leading-none'>
            <p data-cy='film-title'>{title}</p>
          </div>
          <div className='flex justify-end gap-2'>
            <span className='dark-pill md:text-sm'>
              {toHouresAndMinutes(runningTime)}
            </span>
            <span className='indigo-pill md:text-sm' data-cy='film-year'>
              {releaseDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
