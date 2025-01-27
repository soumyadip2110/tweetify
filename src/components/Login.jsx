import React, { useState } from 'react'
import { Button, Input } from './index'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const session = await authService.login({'email': email, 'password': password});
            if (session){
                const userData = await authService.getCurrentUser();
                if (userData){                    
                    dispatch(storeLogin(userData));
                    navigate('/');
                }
            } else{
                alert('Wrong Email or Password')
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            <h1 className='text-black'>Login to your account</h1>
            <form className='mt-8' onSubmit={handleSubmit}>
                <div className=''>
                    <Input
                        label='Email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type='submit'
                        className='mt-2 hover:bg-blue-800'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
