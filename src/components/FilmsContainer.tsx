import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmCard, Loading, Pagination, SearchBar } from '.';
import GhibliContext from '../context/Ghibli/GhibliContext';
import { getFilms } from '../context/Ghibli/GhibliActions';
import { FilmItem } from '../@types/CommonTypes';

const FilmsContainer: FC = () => {
  const { films, isLoading, dispatch } = useContext(GhibliContext);
  const [currentFilmsList, setCurrentFilmsList] = useState<FilmItem[]>([]);
  const [displayedFilms, setDisplayedFilms] = useState<FilmItem[]>([]);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(10);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const fetchFilms = async () => {
      const filmsData = await getFilms();
      dispatch({ type: 'SET_FILMS', payload: filmsData });

      setCurrentFilmsList(filmsData);
      setDisplayedFilms(filmsData.slice(0, filmsPerPage));
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
      setCurrentFilmsList(films);
    }

    if (searchCriteria === 'name') {
      const search = searchValue.toLowerCase();
      const searchResult = films.filter((film) => {
        const filmTitle = film.title.toLowerCase();
        return filmTitle.includes(search);
      });
      setCurrentFilmsList(searchResult);
      setDisplayedFilms(searchResult);
    }

    if (searchCriteria === 'year') {
      const searchResult = films.filter(
        (film) => film.releaseDate === searchValue
      );
      setCurrentFilmsList(searchResult);
      setDisplayedFilms(searchResult);
    }
  };

  const handlePaginate = useCallback(
    (pageNumber: number) => {
      const indexOfLastFilm = pageNumber * filmsPerPage;
      const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
      const currentFilms = currentFilmsList.slice(
        indexOfFirstFilm,
        indexOfLastFilm
      );
      setDisplayedFilms(currentFilms);
      setCurrentPage(pageNumber);
    },
    [filmsPerPage, currentFilmsList]
  );

  const handleNext = (): void => {
    const lastPage = Math.ceil(currentFilmsList.length / filmsPerPage);
    const nextPage = currentPage + 1;
    if (nextPage <= lastPage) {
      handlePaginate(nextPage);
    }
  };

  const handlePrev = (): void => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      handlePaginate(prevPage);
    }
  };

  const cardsMarkup = displayedFilms.map((film, idx) => {
    return (
      <Link key={idx} to={`/films/${film.id}`}>
        <FilmCard {...film} />
      </Link>
    );
  });

  return (
    <div className='mx-6 md:mx-32 lg:mx-48'>
      <div className='rounded-3xl flex flex-col'>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleCriteriaChange={handleCriteriaChange}
          handleSearch={handleSearch}
        />
        <div className='text-center'>
          <Pagination
            filmsPerPage={filmsPerPage}
            totalFilms={currentFilmsList.length}
            handlePaginate={handlePaginate}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
        <div className='grid grid-rows-2 place-items-center items-center gap-4 px-5 pb-5'>
          {isLoading ? <Loading /> : cardsMarkup}
        </div>
      </div>
    </div>
  );
};

export default FilmsContainer;
