import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className='flex flex-col items-center mt-44'>
      <div className='px-3 py-1 text-2xl font-small leading-none text-center rounded-full animate-pulse bg-blue-900 text-blue-200'>
        loading the good stuff...
      </div>
    </div>
  );
};

export default Loading;
