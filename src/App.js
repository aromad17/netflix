import Nav from "compenents/Nav";
import Banner from "compenents/Banner";
import Row from "compenents/Row";
import Footer from "compenents/Footer";
import requests from "api/requests";
import "./styles/app.css"
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "routes/MainPage";
import SearchPage from "routes/SearchPage";
import DetailPage from "routes/DetailPage";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>


      {/* 중첩 라우팅(Nested Routes)
    <Outlet/>
    자식 경로 요소를 렌더링하려면 부모경로요소에서 Outlet 을 사용해야 합니다.
    이렇게 하면 하위 경로가 렌더링 될때 중첩된 UI가 표시될 수 있습니다.
    부모 라우트가  
    */}




    </div>
  );
}

export default App;
