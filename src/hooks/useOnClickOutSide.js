import React, { useEffect } from 'react'

function useOnClickOutSide(ref, handler) {


  useEffect(() => {

    const listner = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        //모달창이 안 닫히는 경우
        return;
      }
      //모달창이 닫히는 경우 ()=>{setModalOpen(false)}
      handler(e);
    }

    document.addEventListener("mousedown", listner)
    document.addEventListener("touchstart", listner)
  }, [ref, handler])


  return (
    <div>useOnClickOutSide</div>
  )
}

export default useOnClickOutSide