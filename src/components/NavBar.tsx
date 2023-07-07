import { FC } from 'react';
import { Link } from 'react-router-dom';

const NavBar: FC = () => {
  return (
    <nav
      data-cy='nav-bar'
      className='flex px-3 md:px-5 flex-shrink-0 bg-gray-900 border-gray-800 p-3 h-16 justify-start gap-5'
    >
      <Link to='/'>
        <div className='h-11 w-11 invert'>
          <img src='logo.png' alt='logo' />
        </div>
      </Link>
      <div className='font-mono self-center text-white text'>
        <p>The Ghibli Movie DataBase</p>
      </div>
    </nav>
  );
};

export default NavBar;
