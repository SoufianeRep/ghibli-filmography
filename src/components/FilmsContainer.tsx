import { FC, useContext, useEffect } from 'react';
import { FilmCard } from '.';
import GhibliContext from '../context/Ghibli/GhibliContext';
import { getFilms } from '../context/Ghibli/GhibliActions';

const FilmsContainer: FC = () => {
  const { films, isLoading, dispatch } = useContext(GhibliContext);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const fetchFilms = async () => {
      const filmsData = await getFilms();
      dispatch({ type: 'GET_FILMS', payload: filmsData });
    };

    fetchFilms();
  }, []);

  const cardsMarkup = films.map((film, idx) => {
    return <FilmCard key={idx} {...film} />;
  });

  const loadingMarkup = <div>Loading...</div>;

  if (isLoading) return loadingMarkup;

  return (
    <div className='h-full mx-24 my-2 border rounded-3xl border-white flex flex-col'>
      <div className='text-center'>
        <input type='text' />
        <button>Search</button>
      </div>
      <div>{cardsMarkup}</div>
    </div>
  );
};

export default FilmsContainer;
