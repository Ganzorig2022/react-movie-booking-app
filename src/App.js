import './App.css';
import MovieList from './components/MovieList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TimeOrder from './components/Time';
import Seat from './components/Seat';
import Navbar from './components/NavBar';
import CancelOrder from './components/CancelOrder';
import movieData from './MovieData.json';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route
            path='/movie'
            element={<MovieList movies={movieData} />}
          ></Route>
          <Route path='/time' element={<TimeOrder />}></Route>
          <Route path='/seat' element={<Seat />}></Route>
          <Route path='/cancel' element={<CancelOrder />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
