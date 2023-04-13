import requests from '../api/requests';
import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import 'styles/DetailPage.css';
import { FaPlayCircle } from "react-icons/fa";

function DetailPage() {

  const [movie, setMovie] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [genres, setGenres] = useState([]);

  let { movieId } = useParams();

  useEffect(() => {
    fetchData();
  }, [movieId])

  const fetchData = async () => {
    try {
      const getMovie = await axios.get(`/movie/${movieId}`);
      console.log("get->", getMovie);

      setMovie(getMovie.data);
      setGenres(getMovie.data.genres);


    } catch (error) {
      console.log(error)
    }
  };

  if (!movie) return <h1>Loading...</h1>





  return (
    <div className='detail_container'>
      <div className='poster_wrap'>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="{movie.title || movie.name || movie.original_name}" />
      </div>

      <div className='detail_bg'>
        <div className='detail_cont'>

          <ul className='detail_genres'>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>

          <h2 className='detail_title'>{movie.title}</h2>

          <ul className='detail_info'>
            <li>{movie.release_date}</li>
            <li><span>평점</span> : {movie.vote_average}</li>
          </ul>

          <p className='detail_overview'>
            {movie.overview}
          </p>

        </div>
      </div>

    </div>
  )
}
export default DetailPage