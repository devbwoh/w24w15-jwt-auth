import React, { useState } from 'react'

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignup = async (e) => {
        // 입력 form이 제출되었을 때 default로 페이지가 새로 고침되는 것을 방지
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('입력한 패스워드가 일치하지 않습니다.')
            return
        }

        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            }),
        })

        //console.log(response)

        const data = await response.json()

        //console.log(data)

        if (data.token) {
            // 서버에서 받은 JWT 토큰을 쿠키에 저장하고, 
            // setToken을 호출해 부모 컴포넌트에 토큰 전달
            //document.cookie = `token=${data.token}; path=/; max-age=3600`
            // 30초로 변경
            document.cookie = `token=${data.token}; path=/; max-age=30`
            setToken(data.token)
        } else {
            setError('회원 가입 실패')
        }
    }

    return (
        <form onSubmit={handleSignup}>
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
            <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button type="submit">Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default Signup
