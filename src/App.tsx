import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GhibliProvider } from './context/Ghibli/GhibliContext';
import { NavBar, FilmsContainer, Film } from './components/index';

function App() {
  return (
    <GhibliProvider>
      <div className='flex flex-col h-screen bg-gray-500 overflow-auto'>
        <NavBar />
        <Router>
          <Routes>
            <Route path='/' element={<FilmsContainer />} />
            <Route path='/films/:id' element={<Film />} />
          </Routes>
        </Router>
      </div>
    </GhibliProvider>
  );
}

export default App;
