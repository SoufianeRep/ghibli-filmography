import { FC } from 'react';
import { SearchBarProps } from '../@types/CommonTypes';

const SearchBar: FC<SearchBarProps> = ({
  searchValue,
  setSearchValue,
  handleCriteriaChange,
  handleSearch,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };
  return (
    <form onSubmit={handleSearch} className='p-6 flex'>
      <select
        onChange={handleCriteriaChange}
        className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-l-lg  focus:ring-4 focus:outline-none  bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600'
      >
        <option value='name'>By Name</option>
        <option value='year'>By Year</option>
      </select>
      <div className='relative w-full'>
        <input
          type='search'
          className='p-2.5 w-full z-20 text-md rounded-r-lg border bg-gray-700 border-l-gray-700  border-gray-600 placeholder-gray-300 text-white focus:border-blue-600'
          placeholder='Search For a Film...'
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button
          type='submit'
          className='absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white rounded-r-lg border border-blue-700 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
        >
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
