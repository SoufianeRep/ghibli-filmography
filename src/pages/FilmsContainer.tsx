import { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmCard, Loading, Pagination, SearchBar } from '../components/index';
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
      return;
    }

    if (searchCriteria === 'name') {
      const search = searchValue.toLowerCase().trim();
      const searchResult = films.filter((film) => {
        const filmTitle = film.title.toLowerCase();
        return filmTitle.includes(search);
      });
      setFilteredFilms(() => searchResult);
    }

    if (searchCriteria === 'year') {
      const searchResult = films.filter(
        (film) => film.releaseDate === searchValue.trim()
      );
      setFilteredFilms(searchResult);
    }
  };

  // search side effect to display the correct paginated films
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
  const cardsMarkup = (
    <div
      data-cy='movie-list'
      className='flex justify-center flex-wrap items-center gap-2 px-5 pb-5'
    >
      {displayedFilms.map((film, idx) => {
        return (
          <Link key={idx} to={`/films/${film.id}`} className='self-stretch'>
            <FilmCard people={[]} {...film} />
          </Link>
        );
      })}
    </div>
  );

  const noResultMarkup = (
    <div className='flex flex-col items-center mt-20'>
      <p className='text-gray-300 text-2xl font-medium' data-cy='no-result'>
        No search results for: "{searchValue}"
      </p>
    </div>
  );

  return (
    <div className='h-full mx-6 md:mx-24 lg:mx-32 flex flex-col'>
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
      {isLoading ? (
        <Loading />
      ) : displayedFilms.length === 0 ? (
        noResultMarkup
      ) : (
        cardsMarkup
      )}
    </div>
  );
};

export default FilmsContainer;
