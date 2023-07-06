import { FC } from 'react';
import { ReactComponent } from '*.svg';

const NavBar: FC = () => {
  return (
    <nav
      data-cy='nav-bar'
      className='flex-shrink-0 bg-gray-800 border-gray-800 p-3 h-20 justify-start'
    >
      <div className='h-10 w-10'>
        <img src='https://ghibliapi.vercel.app/images/logo.svg' alt='' />
      </div>
    </nav>
  );
};

export default NavBar;
