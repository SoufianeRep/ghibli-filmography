import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmCard, Loading, Pagination, SearchBar } from '.';
import GhibliContext from '../context/Ghibli/GhibliContext';
import { getFilms } from '../context/Ghibli/GhibliActions';
import { FilmItem } from '../@types/CommonTypes';

const FilmsContainer: FC = () => {
  const { films, isLoading, dispatch } = useContext(GhibliContext);
  const [filteredFilms, setFilteredFilms] = useState<FilmItem[]>([]);
  const [displayedFilms, setDisplayedFilms] = useState<FilmItem[]>([]);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(10);

  const fetchFilms = async () => {
    try {
      const filmsData = await getFilms();
      dispatch({ type: 'SET_FILMS', payload: filmsData });

      setFilteredFilms(filmsData);
      setDisplayedFilms(filmsData.slice(0, filmsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    fetchFilms();
  }, []);

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = e.currentTarget.value;
    setSearchCriteria(criteria);
  };

  // handles the search and updates the films list
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue === '') {
      setDisplayedFilms(films.slice(0, filmsPerPage));
    }

    if (searchCriteria === 'name') {
      const search = searchValue.toLowerCase();
      const searchResult = films.filter((film) => {
        const filmTitle = film.title.toLowerCase();
        return filmTitle.includes(search);
      });
      setFilteredFilms(() => searchResult);
    }

    if (searchCriteria === 'year') {
      const searchResult = films.filter(
        (film) => film.releaseDate === searchValue
      );
      setFilteredFilms(searchResult);
    }
  };

  // search effect to display the correct paginated films films
  useEffect(() => {
    handlePaginate(1);
  }, [filteredFilms]);

  // handles the list of films to be displayed on pagination navigation
  const handlePaginate = (pageNumber: number) => {
    const lastFilm = pageNumber * filmsPerPage;
    const firstFilm = lastFilm - filmsPerPage;
    const currentList = filteredFilms.slice(firstFilm, lastFilm);
    setDisplayedFilms(() => currentList);
    setCurrentPage(pageNumber);
  };

  // handles next page button
  const handleNext = (): void => {
    const lastPage = Math.ceil(filteredFilms.length / filmsPerPage);
    const nextPage = currentPage + 1;
    if (nextPage <= lastPage) {
      handlePaginate(nextPage);
    }
  };

  // handles previous button
  const handlePrev = (): void => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      handlePaginate(prevPage);
    }
  };

  // Render film cards
  const cardsMarkup = displayedFilms.map((film, idx) => {
    return (
      <Link key={idx} to={`/films/${film.id}`} className='self-stretch'>
        <FilmCard {...film} />
      </Link>
    );
  });

  return (
    <div className='mx-6 md:mx-24 lg:mx-32'>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleCriteriaChange={handleCriteriaChange}
        handleSearch={handleSearch}
      />
      {filteredFilms.length > 0 && (
        <Pagination
          filmsPerPage={filmsPerPage}
          totalFilms={filteredFilms.length}
          handlePaginate={handlePaginate}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
      <div className='flex justify-center flex-wrap items-center gap-2 px-5 pb-5'>
        {isLoading ? <Loading /> : cardsMarkup}
      </div>
    </div>
  );
};

export default FilmsContainer;
