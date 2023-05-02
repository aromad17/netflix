import useOnClickOutSide from 'hooks/useOnClickOutSide';
import React, { useRef } from 'react'
import "styles/MovieModal.css"

function MovieModal({ movie, setModalOpen, backdrop_path, name, first_air_date, overview, release_date, title, vote_average }) {
  const overviewLength = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const ref = useRef();

  useOnClickOutSide(ref, () => { setModalOpen(false) });

  console.log(movie);

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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal