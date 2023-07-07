import { Routes, Route } from 'react-router-dom';
import { GhibliProvider } from './context/Ghibli/GhibliContext';
import { FilmsPage, Film, PageNotFound } from './pages/index';
import { NavBar } from './components/index';

function App() {
  return (
    <GhibliProvider>
      <div className='flex flex-col h-screen bg-gradient-to-bl from-gray-800 via-gray-600 to-gray-500 overflow-auto'>
        <NavBar />

        <Routes>
          <Route path='/' element={<FilmsPage />} />
          <Route path='/films/:id' element={<Film />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </div>
    </GhibliProvider>
  );
}

export default App;
