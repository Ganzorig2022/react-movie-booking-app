import './App.css';
import MovieList from './components/MovieList';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TimeOrder from './components/Time';
import movieData from './MovieData.json';

function App() {
  // const [movies, setMovies] = useState([]);
  // setMovies(movieData);
  // console.log(movies);
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/time' element={<TimeOrder />}></Route>
          <Route path='/' element={<MovieList movies={movieData} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
