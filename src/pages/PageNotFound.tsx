import { FC } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: FC = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col lg:flex-row gap-4 items-center'>
        <img
          className='h-[200px] w-[200px]'
          src='totoro.png'
          alt='totoro under the rain'
        />
        <div className='self-center flex items-center flex-col'>
          <p className='text-gray-200 text-4xl font-bold text-center'>
            404 - NOT FOUND
          </p>
          <p className='text-gray-300 text-xl font-bold px-5 leading-1 text-center lg:px-0'>
            The page you are looking for does not exist
          </p>
          <Link to='/'>
            <button className='mt-4 flex items-center justify-center px-3 h-8 ml-0 leading-tight border rounded-lg bg-gray-800 border-gray-700 text-gray-400 shadow-lg hover:bg-gray-700 hover:text-white'>
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
