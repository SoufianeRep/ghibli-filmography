import { NavBar } from './components/index';
import { GhibliProvider } from './context/Ghibli/GhibliContext';

function App() {
  return (
    <GhibliProvider>
      <div className='flex flex-col justify-between h-screen bg-gray-700'>
        <NavBar />
      </div>
    </GhibliProvider>
  );
}

export default App;
