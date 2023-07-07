import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GhibliContext from '../context/Ghibli/GhibliContext';
import { getFilm, getFilmPeople } from '../context/Ghibli/GhibliActions';
import { toHouresAndMinutes } from '../utils/helpers';
import { Loading } from '../components/index';

const Film: FC = () => {
  const { film, isLoading, dispatch } = useContext(GhibliContext);
  const { id } = useParams();

  const fetchFilm = async () => {
    try {
      const filmData = await getFilm(id);
      const people = await getFilmPeople(filmData.people);
      filmData.people = people
        .map((person) => person.data.name)
        .filter((person) => person);
      dispatch({ type: 'GET_FILM', payload: filmData });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });

    fetchFilm();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div
      className='flex justify-center items-center relative'
      data-cy='film-info'
    >
      <div className='md:w-3/4 p-3 md:p-4 m-5 border border-gray-950 bg-gray-900 rounded-md drop-shadow-xl shadow-2xl'>
        <div className='md:flex justify-start items-center gap-3 px-3'>
          <p className='text-white text-3xl lg:text-5xl font-semibold leading-none lg:leading-none'>
            {film.title}
          </p>
          <div className='self-end flex gap-2 pt-4 md:pt-0 lg:pb-1'>
            <span className='indigo-pill'>
              {toHouresAndMinutes(film.runningTime)}
            </span>
            <span className='dark-pill'>{film?.releaseDate}</span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row w-full'>
          <div className='md:w-1/3 p-2 mt-3'>
            <img src={film?.image} alt='film image' />
          </div>
          <div className='md:w-2/3 w-full p-3 text-gray-400'>
            <div className='mb-3'>
              <p className='text-lg font-semibold text-gray-100'>Overview</p>
              <p className='description text-lg' data-cy='film-data'>
                {film?.description}
              </p>
            </div>
            <div className='f-info-item'>
              <p className='f-info-item-title'>Original title</p>
              <p data-cy='film-data'>{film.originalTitle}</p>
            </div>
            <div className='f-info-item'>
              <p className='f-info-item-title'>Romanized title</p>
              <p data-cy='film-data'>{film.originalTitleRomanised}</p>
            </div>
            <div className='f-info-item'>
              <p className='f-info-item-title'>Director</p>
              <p data-cy='film-data'>{film.director}</p>
            </div>
            <div className='f-info-item'>
              <p className='f-info-item-title'>Producer</p>
              <p>{film.producer}</p>
            </div>
            <div className='f-info-item'>
              <p className='f-info-item-title'>People</p>
              <div className='flex gap-2 flex-wrap mt-1'>
                {(film.people.length as number) > 0 ? (
                  film?.people?.map((person, idx) => (
                    <p key={idx} className='dark-pill'>
                      {person}
                    </p>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;
