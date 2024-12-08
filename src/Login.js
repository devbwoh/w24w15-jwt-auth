import React, { useState } from 'react'
import { LOGIN_URL } from './api'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        // 입력 form이 제출되었을 때 default로 페이지가 새로 고침되는 것을 방지
        e.preventDefault()

        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            body: new URLSearchParams({
                username: username,
                password: password
            }),
        })
        
        console.log(response)

        if (!response.ok) {
            setError('로그인 실패')
            return;
        }

        const data = await response.json()
        if (data.token) {
            //document.cookie = `token=${data.token}; path=/; max-age=3600`
            // 30초
            document.cookie = `token=${data.token}; path=/; max-age=30`
            setToken(data.token)
        } else {
            alert('로그인 오류')
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

export default Login
