import requests from '../api/requests';
import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import 'styles/DetailPage.css';
import { FaPlayCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import styled from 'styled-components';
import { FaPlusSquare, FaThumbsUp, FaHeart } from 'react-icons/fa';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'compenents/fbase';

function DetailPage({ userObj }) {

  const [movie, setMovie] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [genres, setGenres] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  let { movieId } = useParams();

  const navigate = useNavigate();

  const onAddList = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "movie_list"), {
        userId: userObj.uid,
        createdAt: Date.now(),
        movieDetail: movieDetail,  // movieDetail state를 사용하여 저장
        movieId: movieDetail.id    // movieDetail state를 사용하여 저장
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  useEffect(() => {
    fetchData();
  }, [movieId])

  const fetchData = async () => {
    try {
      const { data: getMovie } = await axios.get(`/movie/${movieId}`, {
        params: {
          append_to_response: "videos"
        }
      });

      console.log("get->", getMovie);

      setMovie(getMovie);
      setMovieDetail(getMovie);
      setGenres(getMovie.genres);


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

          <h3>{movie.tagline ? movie.tagline :
            " "
          }</h3>

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

          <ul className='movie_like'>
            <li><FaHeart onClick={onAddList} title='영화 찜하기' /></li>
          </ul>

        </div>

        <div className='detail_video' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

          <FaPlayCircle onClick={() => { setIsClicked(true) }} />
          <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="{movie.title || movie.name || movie.original_name}" />

        </div>
      </div>
      {isClicked ?
        <>
          <span className='go_back' onClick={() => { setIsClicked(false) }}>
            X
          </span>
          <Iframe
            src={`https://youtube.com/embed/${movie.videos.results[0]?.key}?controls=1&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            frameborder='0'
            allow='autoplay; Fullscreen'
          >
          </Iframe>
        </>
        :
        <></>
      }
      <div className='prev_page'><AiOutlineClose onClick={() => { navigate(-1) }} /></div>
    </div>
  )
}

const Iframe = styled.iframe`
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  border:none;
  z-index:2000;
`;

export default DetailPage