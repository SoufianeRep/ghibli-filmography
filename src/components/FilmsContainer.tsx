import { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmCard, SearchBar } from '.';
import GhibliContext from '../context/Ghibli/GhibliContext';
import { getFilms } from '../context/Ghibli/GhibliActions';
import { FilmItem } from '../@types/CommonTypes';

const FilmsContainer: FC = () => {
  const { films, isLoading, dispatch } = useContext(GhibliContext);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [filteredFilms, setFilteredFilms] = useState<FilmItem[]>([]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const fetchFilms = async () => {
      const filmsData = await getFilms();
      dispatch({ type: 'SET_FILMS', payload: filmsData });
      setFilteredFilms(filmsData);
    };

    fetchFilms();
  }, []);

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.currentTarget.value;
    setSearchCriteria(criteria);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue === '') {
      setFilteredFilms(films);
    }

    if (searchCriteria === 'name') {
      const search = searchValue.toLowerCase();
      const searchResult = films.filter((film) => {
        const filmTitle = film.title.toLowerCase();
        return filmTitle.includes(search);
      });
      setFilteredFilms(searchResult);
    }

    if (searchCriteria === 'year') {
      const searchResult = films.filter(
        (film) => film.releaseDate === searchValue
      );
      setFilteredFilms(searchResult);
    }
  };

  const cardsMarkup = filteredFilms.map((film, idx) => {
    return (
      <Link key={idx} to={`/films/${film.id}`}>
        <FilmCard {...film} />
      </Link>
    );
  });

  const loadingMarkup = <div>Loading...</div>;

  if (isLoading) return loadingMarkup;

  return (
    <div className='rounded-3xl flex flex-col'>
      <div className='text-center'>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleCriteriaChange={handleCriteriaChange}
          handleSearch={handleSearch}
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-col-3 justify-items-center items-start gap-4 px-5'>
        {cardsMarkup}
      </div>
    </div>
  );
};

export default FilmsContainer;
