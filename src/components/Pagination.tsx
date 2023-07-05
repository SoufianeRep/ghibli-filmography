import { FC } from 'react';

const Pagination: FC = ({ filmsPerPage, totalFilms, paginate }) => {
  const pageNumbers = [];
  const numberOfPages = Math.ceil(totalFilms / filmsPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  const pageNumbersMarkup = pageNumbers.map((number) => (
    <li key={number}>
      <a
        onClick={() => paginate(number)}
        className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        {number}
      </a>
    </li>
  ));

  return (
    <nav aria-label='Page navigation example'>
      <ul className='inline-flex -space-x-px text-sm'>
        <li>
          <a className='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            Prev
          </a>
        </li>

        {pageNumbersMarkup}
        <li>
          <a className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
