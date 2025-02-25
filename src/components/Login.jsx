import React, { useState } from 'react'
import { Button, Container, Input } from './index'
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
            const session = await authService.login({ 'email': email, 'password': password });
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    navigate('/');
                }
            } else {
                alert('Wrong Email or Password')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className='mt-[6rem] p-6'>
            <h1 className='text-2xl font-bold'>Login to your account</h1>
            <form className='w-full sm:w-1/2 md:w-1/3 m-auto mt-6 flex flex-col justify-center p-6 bg-[#687EFF] bg-opacity-10 border hover:shadow-[0px_0px_6px_#fff] duration-200 rounded-xl h-full' onSubmit={handleSubmit}>
                <div className='p-2'>
                    <Input
                        label='Email:'
                        labelText='white'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='h-7'
                        autoComplete="email"
                    />
                </div>
                <div className='p-2'>
                    <Input
                        label='Password:'
                        type='password'
                        labelText='white'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='h-7'
                        autoComplete="current-password"
                    />
                </div>
                <div className='p-1'>
                    <Button
                        type='submit'
                        className='mt-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 duration-200'
                        bgColor='bg-[#475dde]'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default Login
