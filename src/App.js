import './App.css';
import MovieList from './pages/MovieList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import TimeOrder from './pages/Time';
import Seat from './pages/Seat';
import Navbar from './components/NavBar';
import CancelOrder from './components/CancelOrder';
import movieData from './assets/MovieData.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/movie' element={<MovieList movies={movieData} />} />
            <Route path='/time' element={<TimeOrder />}></Route>
            <Route path='/seat' element={<Seat />}></Route>
            <Route path='/cancel' element={<CancelOrder />}></Route>
          </Routes>
        </div>
      </Router>{' '}
      <ToastContainer />
    </>
  );
};

export default App;
