import { authService } from 'compenents/fbase';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'styles/join.css'

function Join({ movieflixLogo }) {

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      data = await authService.createUserWithEmailAndPassword(userId, userPw);
      setUserId("");
      setUserPw("");
      navigate('/');
      alert("환영합니다.")
    } catch (error) {
      setError(error);
      alert(error);
    }
  }

  const onChangeId = (e) => {
    const { target: { value } } = e;
    setUserId(value);
  }

  const onChangePw = (e) => {
    const { target: { value } } = e;
    setUserPw(value);
  }


  return (

    <div className='join_wrap'>
      <div className='auth_background'>

      </div>



      <form onSubmit={onSubmit}>


        <fieldset>
          <h1>
            <img src={movieflixLogo} alt="" />
          </h1>
          <h2>회원가입</h2>
          {/* 이메일 입력 */}
          <input className="input_id" name="email" type="email" placeholder='E-mail' required value={userId} onChange={onChangeId} />

          {/* 비번 */}
          <input className="input_pw" autoComplete="current-password" name="password" type="password" placeholder='Password' required value={userPw} onChange={onChangePw} />



          <input className="input_submit" type="submit" value="가입하기" />




        </fieldset>
      </form>
    </div>
  )
}

export default Join