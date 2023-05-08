import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './fbase';
import 'styles/movieList.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { useNavigate } from 'react-router-dom';

function MovieList({ userObj }) {
  const navigate = useNavigate();
  const [addList, setAddList] = useState([]);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    const q = query(collection(db, "movie_list"), where("userId", "==", userObj.uid), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      const uniqueMovies = new Set();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!uniqueMovies.has(data.movieId)) {
          newArray.push({ id: doc.id, ...data });
          uniqueMovies.add(data.movieId);
        }
      });
      setAddList(newArray);
    });
    return unsubscribe;
  }, [userObj.uid]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={6}
      slidesPerGroup={6}
      pagination={{ clickable: true }}
      navigation
    >
      {addList.map((movie) => (
        <SwiperSlide key={movie.movieId} className='my_movie_list' onClick={() => { navigate(`/${movie.movieId}`) }}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.movieDetail.backdrop_path}`}
            alt={movie.title || movie.name || movie.original_name}
          />
          <div className='movie_list_detail'>
            <h2>{truncate(movie.movieDetail.title, 20)}</h2>
            <ul>
              {movie.movieDetail.genres.map((genre, idx) => (
                <li key={idx}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieList;
