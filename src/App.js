import React, { useState, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'
import { jwtDecode } from 'jwt-decode'

const App = () => {
    const [username, setUsername] = useState('')
    const [token, setToken] = useState(null)
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        const cookieToken = document
                .cookie
                .split(';')
                .find(cookie => cookie.includes('token'))

        if (cookieToken) {
          const localToken = cookieToken.split('=')[1]
          setToken(localToken)

          // JWT 토큰 디코딩하여 username 추출
          try {
            const decodedToken = jwtDecode(localToken)
            //console.log(decodedToken)
            setUsername(decodedToken.sub)
          } catch (error) {
              console.error("Invalid token", error)
          }

        }
    }, [])

    useEffect(() => {
      if (token) {
          try {
              const decodedToken = jwtDecode(token)
              setUsername(decodedToken.sub)
          } catch (error) {
              console.error("Invalid token", error)
          }
      }
    }, [token])

    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }

    return (
        <div>
            {token ? (
                <h1>{username}님, 반갑습니다.</h1>
            ) : (
                <div>
                    <button onClick={toggleSignup}>
                        {isSignup ? '이미 가입했다면 로그인' : '가입하지 않았다면 회원 가입'}
                    </button>
                    
                    {isSignup ? (
                        <Signup setToken={setToken} />
                    ) : (
                        <Login setToken={setToken} />
                    )}
                </div>
            )}
        </div>
    )
}

export default App
