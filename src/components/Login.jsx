import React, { useState } from 'react'
import { Button, Input } from './index'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

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
        <div className="max-w-sm mx-auto p-6 shadow-md bg-white bg-opacity-10 backdrop-blur-sm rounded-lg">
        {/* <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg"> */}
            <h1 className="text-2xl font-bold text-gray-800 text-center">Login to your account</h1>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Login
                </Button>
            </form>
            <div className="text-center mt-4 text-sm text-gray-900">
                <p>
                    Don't have an account? <Link 
                        to="/signup"
                        className="text-white hover:underline">
                            Sign up
                    </Link>
                </p>
            </div>
        </div>











        // <div>
        //     <h1 className='text-black'>Login to your account</h1>
        //     <form className='mt-8' onSubmit={handleSubmit}>
        //         <div className=''>
        //             <Input
        //                 label='Email'
        //                 placeholder='Enter your email'
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //             <Input
        //                 label='Password'
        //                 type='password'
        //                 placeholder='Enter your password'
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <Button
        //                 type='submit'
        //                 className='mt-2 hover:bg-blue-800'
        //             >
        //                 Login
        //             </Button>
        //         </div>
        //     </form>
        // </div>
    )
}

export default Login
