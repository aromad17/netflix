import React, { useEffect, useState } from 'react'

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay)

    return () => {
      clearTimeout(handler)
    }
    //글자 입력후 delay 시간 안에 글자가 눌리면 setTimeout으로 핸들러 함수 종료됨,
    //하지만
    // delay time동안 글자 입력이 없으면 debounceValue로 value의 값이 들어감
  }, [value, delay])

  return debounceValue;
}

export default useDebounce