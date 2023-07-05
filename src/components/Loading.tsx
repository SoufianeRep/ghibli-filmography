import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className='flex items-center justify-center w-56 h-56 border rounded-lg bg-gray-800 border-gray-700'>
      <div className='px-3 py-1 text-2xl font-small leading-none text-center rounded-full animate-pulse bg-blue-900 text-blue-200'>
        loading...
      </div>
    </div>
  );
};

export default Loading;
