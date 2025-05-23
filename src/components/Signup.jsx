import React, { useRef, useState } from 'react'
import { Button, Container, Input } from './index'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const passInputRef = useRef(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Check if email is valid
        if (emailRegex.test(email)) {
            try {
                const userAccount = await authService.createAccount({ email, password, username });
                if (userAccount) {
                    const userData = await authService.getCurrentUser();
                    if (userData) {
                        dispatch(storeLogin(userData));
                        setLoading(false);
                        navigate('/');
                    }
                } else {
                    alert('Something went wrong!')
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            alert('Please enter a valid email!')
        }
    }

    const handlePassShow = () => {
        if (passInputRef.current.type == 'password') {
            passInputRef.current.type = 'text'
        } else {
            passInputRef.current.type = 'password'
        }
    }

    return loading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>Loading...</h1>
        : (
            <Container className='mt-[6rem] p-6'>
                <h1 className='text-2xl font-bold'>Signup and create a account</h1>
                <form className='w-full sm:w-1/2 md:w-1/3 m-auto mt-6 flex flex-col justify-center p-6 bg-[#687EFF] bg-opacity-10 border hover:shadow-[0px_0px_6px_#fff] duration-200 rounded-xl h-full' onSubmit={handleSubmit}>
                    <div className='p-2'>
                        <Input
                            label='Username:'
                            labelText='white'
                            placeholder='Enter a username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='h-7'
                            autoComplete="username"
                        />
                    </div>
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
                            ref={passInputRef}
                            label='Password:'
                            labelText='white'
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='h-7'
                            autoComplete="new-password"
                        />
                        <Button
                            type='button'
                            className={`text-xs mt-1 ${password.length > 0 ? 'block' : 'hidden'}`}
                            bgColor='bg-gray-500'
                            py='1'
                            px='2'
                            onClick={handlePassShow}
                        >
                            Show
                        </Button>
                    </div>
                    <div className='p-2'>
                        <Button
                            type='submit'
                            className='mt-2  bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 duration-200'
                            bgColor='bg-[#475dde]'
                        >
                            Signup
                        </Button>
                    </div>
                </form>
                <h1 className=''>Password must be atleast 8 characters long</h1>
            </Container>
        )
}

export default Signup
