import React, { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import MainPage from 'routes/MainPage'
import DetailPage from 'routes/DetailPage'
import SearchPage from 'routes/SearchPage'
import Auth from 'routes/Auth'
import Join from 'routes/Join'
import MyPage from 'routes/MyPage'

const Layout = ({ userObj, newPhoto }) => {
  return (
    <div>
      <Nav userObj={userObj} newPhoto={newPhoto} />
      <Outlet />
      <Footer />
    </div>
  )
}



function AppRouter({ isLoggedIn, userObj }) {

  const [newPhoto, setNewPhoto] = useState("");

  return (

    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Layout userObj={userObj} newPhoto={newPhoto} />}>
          <Route index element={<MainPage userObj={userObj} />} />
          <Route path=":movieId" element={<DetailPage userObj={userObj} />} />
          <Route path="search" element={<SearchPage />} />
          <Route path='/mypage' element={<MyPage userObj={userObj} newPhoto={newPhoto} setNewPhoto={setNewPhoto} />} />
        </Route>
      ) : (
        <Route path="/" element={<Auth />} />
      )}
      <Route path='/join' element={<Join />} />
    </Routes>


    /* 중첩 라우팅(Nested Routes)
      <Outlet />
      자식 경로 요소를 렌더링하려면 부모경로요소에서 Outlet 을 사용해야 합니다.
      이렇게 하면 하위 경로가 렌더링 될때 중첩된 UI가 표시될 수 있습니다.
      부모 라우트가
      */

  )
}

export default AppRouter