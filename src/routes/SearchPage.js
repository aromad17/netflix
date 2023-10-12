import useDebounce from 'hooks/useDebounce';
import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import 'styles/SearchPage.css'
import { FaPlusSquare, FaThumbsUp, FaHeart } from 'react-icons/fa';

function SearchPage() {

  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  console.log("useLocation->", useLocation())
  let query = useQuery();

  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  console.log("searchTerm->", searchTerm)

  const fetchSearchMovie = async (searchTerm) => {

    try {
      const request = await axios.get(`/search/movie?include_adult=false&query=${searchTerm}`);
      console.log("request->", request)
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error : ", error)
    }

  }

  const overviewLength = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm])


  const renderSearchResults = () => {

    return searchResults.length > 0 ? (

      <section className='search-container'>
        {searchResults.map((movie, idx) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie'>
                <div className='movie__column-poster' >
                  <img src={movieImageUrl} alt={movie.title} className='movie__poster' />
                  <div className='movie__column-detail'>
                    <h2>{movie.title}</h2>
                    <p>  {overviewLength(movie.overview, 60)}</p>
                    <ul>
                      <li><FaPlusSquare onClick={() => { navigate(`/${movie.id}`) }}
                        title='자세히 보기' /></li>
                      <li><FaHeart /></li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        })}

      </section>

    ) : (

      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자하는 "{searchTerm}"에 일치하는 영화가 없습니다. =.=
          </p>
        </div>
      </section>

    );
  }


  return renderSearchResults();
}

export default SearchPage