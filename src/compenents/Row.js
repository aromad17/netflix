import axios from '../api/axios';
import React, { useEffect, useState, useCallback } from 'react';
import 'styles/row.css';
import MovieModal from './MovieModal';
import { FaPlusSquare, FaHeart } from 'react-icons/fa';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './fbase';
import { Cookies } from 'react-cookie';
function Row({ isLargeRow, title, id, fetchUrl, userObj }) {
  const [movies, setMovies] = useState([]);
  const [movieSelected, setMovieSelected] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);

  const handleMouseOver = useCallback(async (movie) => {
    try {
      const { data: getMovie } = await axios.get(`/movie/${movie.id}`, {
        params: {
          append_to_response: 'videos',
        },
      });
      setMouseOver(true);
      setMovieDetail(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOver(false);
  }, []);


  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    try {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  const onAddList = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "movie_list"), {
        userId: userObj.uid,
        createdAt: Date.now(),
        movieDetail: movieDetail,
        movieId: movieDetail.id
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        navigation
        loop={true}
        spaceBetween={50}
        breakpoints={{
          1378: {
            slidesPerView: 6, //한번에 보이는 스라이드 개수
            slidesPerGroup: 6 //몇개씩 슬라이드 할지
          }, 768: {
            slidesPerView: 4,
            slidesPerGroup: 4
          }, 360: {
            slidesPerView: 3,
            slidesPerGroup: 3
          }, 100: {
            slidesPerView: 2,
            slidesPerGroup: 2
          }
        }}
      >

        <div id={id}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className={`row__poster_wrap ${isLargeRow ? "row__posterLarge" : ""}`}
                onMouseOver={() => handleMouseOver(movie)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={isLargeRow ? () => handleClick(movie) : undefined}
              >
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  loading='lazy'
                  alt={movie.title || movie.name || movie.original_name}
                />
                <div className={`${!isLargeRow && "movie_details"}`}>
                  {!isLargeRow &&
                    mouseOver &&
                    movieDetail.videos.results[0] ?
                    <>
                      <iframe
                        src={`https://youtube.com/embed/${movieDetail.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movieDetail.videos.results[0]?.key}`}
                        frameBorder='0'
                        allow='autoplay Fullscreen'
                        width="100%"
                        height="100%"
                        title={`${movie.title || movie.name || movie.original_name} 영상`}

                      >
                      </iframe>
                      <div className="movie_control">
                        <p>{movie.title || movie.name || movie.original_name}</p>
                        <ul>
                          <li className='watch_movie_more'><FaPlusSquare onClick={() => handleClick(movie)}
                            title='자세히 보기' /></li>
                          <li className='add_my_list'><FaHeart onClick={onAddList} /></li>
                        </ul>
                      </div>
                    </>
                    :
                    !isLargeRow &&
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
                        alt={movie.title || movie.name || movie.original_nme}
                      />
                      <div className="movie_control">
                        <p>{movie.title || movie.name || movie.original_name}</p>
                        <ul>
                          <li><FaPlusSquare onClick={() => handleClick(movie, userObj)}
                            title='자세히 보기' /></li>
                          <li><FaHeart onClick={onAddList} title='영화 찜하기' /></li>
                        </ul>
                      </div>
                    </>
                  }


                </div>
              </div>
            </SwiperSlide>

          ))}
        </div>

      </Swiper>

      {
        modalOpen && (
          <MovieModal
            {...movieSelected}
            movieDetail={movieDetail}
            setModalOpen={setModalOpen} //앞은 props 전달, 뒤의 state값인 setModalOpen을 전달
            isLargeRow={isLargeRow}
          />
        )
      }

    </section >
  )
}

export default Row