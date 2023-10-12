import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import requests from '../api/requests'
import '../styles/banner.css'
import styled from 'styled-components';
import MovieModal from './MovieModal';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchData();
    //useEffect 안에서 async 쓸 수 없어서 함수로 생성 후 넣었음
  }, [])

  const [isClicked, setIsClicked] = useState(false);

  const fetchData = async () => {

    const request = await axios.get(requests.fetchNowPlaying);

    // 현재 상영 중인 영화 정보 가져오기(20개 중에 하나 랜덤으로 가져오기)
    const movieId = request.data.results[Math.floor(Math.random() * 20)].id

    //특정 영화의 더 상세한 정보를 가져오기 (videos 비디오 정보도 포함)
    // /movie/(movie_id)?api_key=(api_key)
    const { data: movieDeatil } = await axios.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos"
      }
    });
    setMovie(movieDeatil);

  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // 스트링(무자열) 뒤에 ?가 있으면 값이 없어도 에러가 안나온다
  }

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  if (!isClicked) {
    return (
      <>
        <header className='banner' style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}>


          <div className='banner__contents'>
            <h1 className='banner__title'>
              {movie.title || movie.name || movie.original_name}
              {/* movie.title이 없으면 movie.name으로 movie.name도 없으면 movie.original_name으로 */}
            </h1>
            <div className='banner__buttons'>
              <button className='banner_button play' onClick={() => { setIsClicked(true) }}>
                play
              </button>
              <button className='banner_button info' onClick={() => handleClick(movie)}>
                <div className='space'>
                  More Info
                </div>
              </button>
            </div>
            <p className='banner__description'>

              {truncate(movie.overview, 100)}

            </p>


          </div>
          <div className='banner--fadeBottom'></div>
        </header>
        {
          modalOpen && (
            <MovieModal
              {...movieSelected}
              setModalOpen={setModalOpen} //앞은 props 전달, 뒤의 state값인 setModalOpen을 전달
            />
          )
        }
      </>
    )
  } else {
    return (
      <>
        <Container>
          <HomeContainer>
            <ExitBtn onClick={() => { setIsClicked(false) }}>닫기</ExitBtn>
            <Iframe
              src={`https://youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
              width='640'
              height='360'
              frameborder='0'
              allow='autoplay; Fullscreen'
            ></Iframe>
          </HomeContainer>
        </Container >
        {
          modalOpen && (
            <MovieModal
              {...movieSelected}
              setModalOpen={setModalOpen} //앞은 props 전달, 뒤의 state값인 setModalOpen을 전달
            />
          )
        }
      </>
    )
  }

}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  position:relative;
  width:100%;
  height:100vh;
`;

const HomeContainer = styled.div`
  width:100%;
  height:100%;
`;
const ExitBtn = styled.div`
position: absolute;
top:80px;
right: 50px;
background: #d71921;
color:#111;
padding:10px 20px;
border-radius: 5px;
font-weight: 600;
z-index: 5;
cursor: pointer;
`
const Iframe = styled.iframe`
  width:100%;
  height:100%;
  z-index:0;
  opacity:0.65;
  border:none;
  &:after{
    content:"";
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
`;

export default Banner