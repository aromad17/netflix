import React, { useState, useEffect } from 'react'
import "../styles/nav.css"
import { Link, useNavigate } from 'react-router-dom';
import { authService } from './fbase';
import movieflixLogo from '../img/movieflix_logo.png';

function Nav({ userObj, newPhoto }) {

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const my = document.querySelector(".nav__avatar");


    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    })

    my.addEventListener("mouseenter", () => {
      my.classList.add("on");

    })

    my.addEventListener("mouseleave", () => {

      my.classList.remove("on");

    })

    return () => { //컴포넌트를 사용하지 않을때
      window.removeEventListener("scroll", () => { })
    }
  }, [])

  const onChange = (e) => {
    const { target: { value } } = e;
    setSearchValue(value);
    navigate(`/search?q=${e.target.value}`);
  }

  const onLogOut = (e) => {
    e.preventDefault();
    authService.signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }




  return (
    <nav className={`nav ${show && "nav__black"}`} >
      <img src={movieflixLogo} alt='netflix log' className='nav__logo' onClick={() => { window.location.href = "/" }} />

      <input type='search' placeholder='영화를 검색해주세요' className='nav__input'
        onChange={onChange} value={searchValue}
      />

      <div className='nav__avatar'>
        {
          newPhoto ? <img src={newPhoto} alt="user profile photo" />
            :
            userObj.photoURL ? <img src={userObj.photoURL} alt="user profile photo" />
              :
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
        }
        <ul>
          <li><Link to='/mypage'>마이 페이지</Link></li>
          <li>고객 센터</li>
          <li>설정</li>
          <li onClick={onLogOut}>로그아웃</li>
        </ul>

      </div>




    </nav >


  )
}

export default Nav