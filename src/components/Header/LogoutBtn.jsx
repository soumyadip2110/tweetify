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
            className='font-bold inline-bock bg-red-700 mx-1 my-2 duration-200 hover:bg-red-800 rounded-lg'
            py='0'
            px='2'
        >
            {btnText}
        </Button>
    )
}

export default LogoutBtn
