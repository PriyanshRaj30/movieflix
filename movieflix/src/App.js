import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './moviecard';
// API-key = b8adcf64 = ba0286b8
  
const API_URL = 'http://www.omdbapi.com/?apikey=ba0286b8&';


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchterm, setsearchterm] = useState('');
    const searchmovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`); // & = parameter separator and s = name of the query
    const data = await response.json(); // converts to json format and store it in data variale
    setMovies(data.Search); // .Search is property od JSON, contains array of movie names
  }
  useEffect( () =>{
    searchmovies('');
  }, [])
  return(

    <div className='app'>
      <h1>CINEMA</h1>
      <div className='search'>
        <input
         placeholder='Search for Movies'
         value={searchterm}
         onChange={(e) => setsearchterm(e.target.value)}
         />
         <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchmovies(searchterm)}
         />
      </div>
         
         {
          movies?.length > 0
          ?(
          <div className='container'>
            {movies.map((movie) => {
              return <MovieCard movie={movie} />
            })}

          </div>
          ) : (
            <div className='empty'>
              <h2> No movies found</h2>
            </div>
          )
         }

    </div>

  );
}

export default App;