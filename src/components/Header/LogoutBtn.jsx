import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout as storeLogout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../index'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(storeLogout());
            navigate('/login');
        });
    }
    
    return (
        <Button
            onClick={logoutHandler}
            className='inline-bock bg-red-800 mx-2 my-1 px-5 py-1 duration-200 hover:bg-red-600 hover:text-black'
        >
            Logout
        </Button>
    )
}

export default LogoutBtn
