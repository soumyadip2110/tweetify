import React from 'react'
import { Container } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn';

function Header() {
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'Add Tweet',
            slug: '/add-tweet',
            active: authStatus
        }
    ];

    return (
        <header className='py-2 m-0 top-0 sticky w-full bg-black drop-shadow-[0px_1px_2px_rgba(255,255,255,1)]'>
        {/* <header className='py-2 m-0 top-0 border-b border-white shadow-sm shadow-gray-200 fixed w-full bg-[#060606]'> */}
            <Container>
                <nav className='flex text-sm md:text-xl'>
                    <div className='mx-1 md:mx-5 my-auto font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent duration-200'>
                    {/* <div className='mx-5 my-auto text-xl font-bold text-[#687EFF] hover:text-white duration-200'> */}
                        <Link to='/'>
                            Tweet-App
                        </Link>
                    </div>
                    {authStatus &&(
                        <div className='mx-1 md:mx-5 my-auto font-bold'>
                            Hello, {userData.name}!
                        </div>
                    )}
                    <ul className='flex ml-auto'>
                        {navItems.map(item =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock mx-2 my-1 px-2 md:px-5 py-1 duration-200 font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:text-white'
                                        // className='inline-bock mx-2 my-1 px-5 py-1 duration-200 font-bold text-[#687EFF] hover:text-white hover:bg-[#475dde] rounded-full'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
