import { FC } from 'react';
import { PaginationProps } from '../@types/CommonTypes';

const Pagination: FC<PaginationProps> = ({
  filmsPerPage,
  totalFilms,
  handlePaginate,
  handleNext,
  handlePrev,
}) => {
  const pageNumbers = [];
  const numberOfPages = Math.ceil(totalFilms / filmsPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  const pageNumbersMarkup = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => handlePaginate(number)}
      className='flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
    >
      {number}
    </button>
  ));

  return (
    <div className='inline-flex -space-x-px text-sm'>
      <button
        onClick={handlePrev}
        className='flex items-center justify-center px-3 h-8 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
      >
        Prev
      </button>

      {pageNumbersMarkup}

      <button
        onClick={handleNext}
        className='flex items-center justify-center px-3 h-8 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
