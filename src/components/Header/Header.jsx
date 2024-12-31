import React, { act } from 'react'
import { Container } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn';

function Header() {
    const authStatus = useSelector(state => state.auth.status);
    // const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
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
            slug: '/addTweet',
            active: authStatus
        }
    ]

    return (
        <header className='py-1 shadow bg-gray-800 rounded-lg'>
            <Container>
                <nav className='flex'>
                    <div className='mx-5 my-auto'>
                        {/* <Link to='/'> */}
                        Tweet-App
                        {/* </Link> */}
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map(item =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        // onClick={navigate(item.slug)}
                                        className='inline-bock mx-2 my-1 px-5 py-1 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
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
