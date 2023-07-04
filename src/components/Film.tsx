import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GhibliContext from '../context/Ghibli/GhibliContext';
import { getFilm, getFilmPeople } from '../context/Ghibli/GhibliActions';
import { toHouresAndMinutes } from '../utils/helpers';

const Film: FC = () => {
  const { film, isLoading, dispatch } = useContext(GhibliContext);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const fetchFilm = async () => {
      const filmData = await getFilm(id);
      const people = await getFilmPeople(filmData.people);
      filmData.people = people.map((person) => person.data.name);
      console.log(filmData.people);

      dispatch({ type: 'GET_FILM', payload: filmData });
    };

    fetchFilm();
  }, []);

  const loadingMarkup = <div>Loading...</div>;

  if (isLoading) return loadingMarkup;

  return (
    <div className='w-full border border-gray-900 bg-gray-800 rounded-md shadow-lg p-4'>
      <div className='film-header flex justify-start gap-4 px-3'>
        <p className='text-white text-5xl font-semibold'>{film?.title}</p>
        <div className='flex items-end gap-2'>
          <span className='indigo-pill'>
            {toHouresAndMinutes(film?.runningTime)}
          </span>
          <span className='dark-pill'>{film?.releaseDate}</span>
        </div>
      </div>

      <div className='film-main flex flex-col md:flex-row f-full'>
        <div className='film-image md:w-1/3 w-full p-3'>
          <img src={film?.image} alt='' />
        </div>
        <div className='film-info md:w-2/3 w-full p-3 text-white'>
          <div className='mb-3'>
            <p className='text-lg font-semibold text-gray-300'>Overview</p>
            <p className='description text-lg'>{film?.description}</p>
          </div>
          <div className='f-info-item'>
            <p className='f-info-item-title'>Original title</p>
            <p>{film?.originalTitle}</p>
          </div>
          <div className='f-info-item'>
            <p className='f-info-item-title'>Romanized title</p>
            <p>{film?.originalTitleRomanised}</p>
          </div>
          <div className='f-info-item'>
            <p className='f-info-item-title'>Director</p>
            <p>{film?.director}</p>
          </div>
          <div className='f-info-item'>
            <p className='f-info-item-title'>Producer</p>
            <p>{film?.producer}</p>
          </div>
          <div className='f-info-item'>
            <p className='f-info-item-title'>People</p>
            <div className='flex gap-2 flex-wrap'>
              {film?.people?.map((person, idx) => (
                <p
                  key={idx}
                  className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white'
                >
                  {person}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;
