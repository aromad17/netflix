import axios from '../api/axios';
import React, { useEffect, useState, useCallback } from 'react';
import 'styles/row.css';
import MovieModal from './MovieModal';
import { FaPlayCircle, FaThumbsUp, FaPlusCircle } from 'react-icons/fa';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({ isLargeRow, title, id, fetchUrl }) {
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
      setMovieSelected(getMovie);
      setMovieDetail(getMovie);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOver(false);
    setMovieSelected({});
  }, []);

  const fetchMovieData = useCallback(async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = useCallback((movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }, []);


  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
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
        spaceBetween={100}
      >
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className='row__poster_wrap'
                onMouseOver={() => handleMouseOver(movie)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <img
                  onClick={() => handleClick(movie)}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  loading='lazy'
                  alt={movie.title || movie.name || movie.original_name}
                />

                <div className='movie_details'>

                  {mouseOver && (
                    movieDetail.videos.results[0] ?
                      <iframe
                        src={`https://youtube.com/embed/${movieDetail.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movieDetail.videos.results[0]?.key}`}
                        frameborder='0'
                        allow='autoplay; Fullscreen'
                        width="100%"
                        height="100%"
                        title={`${movie.title || movie.name || movie.original_name} 영상`}
                      ></iframe>
                      :
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
                        alt={movie.title || movie.name || movie.original_name}
                      />

                  )}

                  <div className='movie_control'>
                    <p>{movie.title || movie.name || movie.original_name}</p>
                    <ul>
                      <li
                        onClick={() => handleClick(movie)}
                        title='자세히 보기'
                      ><FaPlayCircle /></li>
                      <li><FaThumbsUp /></li>
                      <li><FaPlusCircle /></li>
                    </ul>
                  </div>

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
            setModalOpen={setModalOpen} //앞은 props 전달, 뒤의 state값인 setModalOpen을 전달
          />
        )
      }

    </section >
  )
}

export default Row