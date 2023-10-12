import AppRouter from "compenents/AppRouter";
import "styles/app.css"
import { useEffect, useState } from "react";
import { authService } from "./compenents/fbase";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);

  const [userObj, setUserObj] = useState('');

  useEffect((user) => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  })


  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : " Loading...."}
    </>
  );
}

export default App;
