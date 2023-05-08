import React, { useEffect, useState } from 'react'
import "../styles/mypage.css"
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { authService, storage } from 'compenents/fbase';
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from "@firebase/auth";
import MovieList from 'compenents/MovieList';


function MyPage({ userObj, newPhoto, setNewPhoto }) {

  const onPhotoChange = async (e) => {
    e.preventDefault();
    try {
      const { target: { files } } = e;
      const thePhoto = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(thePhoto);

      reader.onloadend = async (finishedPhoto) => {
        const { currentTarget: { result } } = finishedPhoto;
        setNewPhoto(result);
        console.log(newPhoto)

        try {
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(storageRef, result, 'data_url');
          console.log("response->", response)
          const myPhotoUrl = await getDownloadURL(ref(storage, response.ref));

          await updateProfile(userObj, {
            photoURL: myPhotoUrl,
          });

          await authService.currentUser.reload(); // 사용자 정보 갱신

        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='mypage'>
      {
        newPhoto ? <img src={newPhoto} alt="user profile photo" />
          :
          userObj.photoURL ? <img src={userObj.photoURL} alt="user profile photo" />
            :
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
      }

      <form>
        <fieldset>

          <label htmlFor="photo">프로필 이미지 변경</label>
          <input type='file' accept='image/*' id="photo" onChange={onPhotoChange} />

        </fieldset>
      </form>


      <div className='my_email'><span>계정</span>{userObj.email}</div>

      <div className='my_creation_time'><span>가입 시간</span> {userObj.metadata.creationTime}</div>

      <div className='movie_list'>
        <span>찜 목록</span>
        <MovieList userObj={userObj} />
      </div>

    </div>
  )
}

export default MyPage