import './App.css';
import MovieList from './components/MovieList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TimeOrder from './components/Time';
import Seat from './components/Seat';
import Navbar from './components/NavBar';
import movieData from './MovieData.json';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<MovieList movies={movieData} />}></Route>
          <Route path='/time' element={<TimeOrder />}></Route>
          <Route path='/seat' element={<Seat />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
