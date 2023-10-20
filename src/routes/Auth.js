import requests from 'api/requests';
import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import 'styles/auth.css'
import { Link } from 'react-router-dom';
import { authService } from 'compenents/fbase';
import movieflixLogo from '../img/movieflix_logo.png';

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  const onChangeEmail = (e) => {
    const { target: { value } } = e;
    setEmail(value);
  }

  const onChangePw = (e) => {
    const { target: { value } } = e;
    setPassword(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      data = await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error);
      alert(error);
    }
  }


  const modalClick = () => setModal(prev => !prev);

  return (
    <div className='auth_wrap'>

      {modal ?
        <></>
        :
        <div className='joinGuide'>
          <div className='joinModal'>
            회원가입은 실제 존재하는 이메일이 아니라 이메일 형식만 갖춰 입력하여도 가입이 됩니다.
            <button onClick={modalClick}>
              확인
            </button>
          </div>
        </div>

      }



      <div className='auth_background'>

      </div>


      <form onSubmit={onSubmit}>


        <fieldset>
          <h1>
            <img src={movieflixLogo} alt="logo" />
          </h1>
          <h2>로그인</h2>
          <input className="input_id" name="email" type="email" placeholder='E-mail' required value={email} onChange={onChangeEmail} />
          <input className="input_pw" autoComplete="current-password" name="password" type="password" placeholder='Password' required value={password} onChange={onChangePw} />
          <input className="input_submit" type="submit" value="로그인" />
          <span>계정이 없다면? <Link to='/join'>회원가입</Link> 페이지로 이동</span>
        </fieldset>
      </form>

    </div>
  )
}

export default Auth