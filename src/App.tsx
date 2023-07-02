import { GhibliProvider } from './context/Ghibli/GhibliContext';

function App() {
  return (
    <GhibliProvider>
      <div className=''>Ghibli finder</div>
    </GhibliProvider>
  );
}

export default App;
