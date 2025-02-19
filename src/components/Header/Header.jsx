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
        <header className='py-2 m-0 top-0 border-b-2 border-white shadow-md shadow-gray-500 fixed w-full bg-[#060606]'>
            <Container>
                <nav className='flex'>
                    <div className='mx-5 my-auto text-xl font-bold text-[#687EFF] hover:text-white duration-200'>
                        <Link to='/'>
                            Tweet-App
                        </Link>
                    </div>
                    {authStatus &&(
                        <div className='mx-5 my-auto'>
                            User: {userData.name}
                        </div>
                    )}
                    <ul className='flex ml-auto'>
                        {navItems.map(item =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        // className='inline-bock mx-2 my-1 px-5 py-1 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                                        className='inline-bock mx-2 my-1 px-5 py-1 duration-200 font-bold text-[#687EFF] hover:text-white hover:bg-[#475dde] rounded-full'
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
