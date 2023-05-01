import requests from 'api/requests';
import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import 'styles/auth.css'
import { Link } from 'react-router-dom';
import { authService } from 'compenents/fbase';

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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



  return (
    <div className='auth_wrap'>
      <div className='auth_background'>

      </div>


      <form onSubmit={onSubmit}>


        <fieldset>
          <h1>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt="" />
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