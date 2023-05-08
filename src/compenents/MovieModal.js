import useOnClickOutSide from 'hooks/useOnClickOutSide';
import React, { useRef, useState } from 'react'
import "styles/MovieModal.css"
import { FaPlusSquare, FaThumbsUp, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MovieModal({ movieDetail, setModalOpen, id, backdrop_path, name, first_air_date, overview, release_date, title, vote_average, genres }) {



  const overviewLength = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  console.log(movieDetail);

  const ref = useRef();
  const navigate = useNavigate();
  useOnClickOutSide(ref, () => { setModalOpen(false) });


  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={() => setModalOpen(false)}>X</span>
          <img className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title ? title : name} />
          <div className='modal__content'>
            <div className='modal__details'>
              <p className='modal__user_perc'>
                100% for U
              </p> {" "}
              {release_date ? release_date : first_air_date}
              <h2 className='modal__title'>{title || name}</h2>
              <p className='modal__details'>평점 : {vote_average}</p>
              <p className='modal__overview'>
                {overviewLength(overview, 100)}
              </p>
              <ul>
                <li><FaPlusSquare
                  onMouseEnter={() => { console.log({ id }) }}
                  onClick={() => { navigate(`/${id}`) }}
                  title='자세히 보기' /></li>
                <li><FaThumbsUp title='이 영화 좋아요' /></li>
                <li><FaHeart title='영화 찜하기' /></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal