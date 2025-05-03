import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout as storeLogout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../index'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [btnText, setBtnText] = useState('Logout');

    const logoutHandler = () => {
        setBtnText('Loggin out...');
        authService.logout()
            .then(() => {
                dispatch(storeLogout());
                navigate('/login');
            });
    }

    return (
        <Button
            onClick={logoutHandler}
            className='cursor-pointer m-1 md:m-4 hover:scale-110 font-bold inline-bock bg-red-700 mx-1 my-2 duration-200 hover:bg-red-800'
            rounded='[100%]'
            height='50px'
            // className='font-bold inline-bock bg-red-700 mx-1 my-2 duration-200 hover:bg-red-800 rounded-[100%]'
            // className='font-bold inline-bock bg-red-700 mx-1 my-2 duration-200 hover:bg-red-800 rounded-lg'
            py='1'
            px='1'
        >
            {/* {btnText} */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height='17px'
                fill="#fff"
            >
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 224c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
            </svg>
        </Button>
    )
}

export default LogoutBtn
