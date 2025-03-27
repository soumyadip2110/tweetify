import React, { useEffect, useState } from 'react'
import { Container } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn';
import appwriteService from '../../appwrite/config'

function Header() {
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg';
    const [profilePictureLoading, setProfilePictureLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(imageNotFoundUrl);

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
        },
        {
            name: 'Add Story',
            slug: '/add-story',
            active: authStatus
        },
        {
            name: 'My Tweets',
            slug: '/user-tweets',
            active: authStatus
        }
    ];

    useEffect(() => {
        if (authStatus && userData) {
            setProfilePictureLoading(true);
            appwriteService.getProfilePicturePreview(userData.$id)
                .then(data => {
                    if (data) setImageUrl(data)
                    else setImageUrl(imageNotFoundUrl);
                })
                .catch(e => console.log(e))
                .finally(() => setProfilePictureLoading(false));
        }
    }, [authStatus])

    return (
        <header className='py-1 m-0 top-0 sticky w-full bg-black drop-shadow-[0px_1px_2px_rgba(255,255,255,1)]'>
            <Container>
                <nav className='flex text-xs md:text-lg'>
                    <div className='mx-1 md:mx-5 my-auto font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent duration-200'>
                        <Link to='/'>
                            Tweetify
                        </Link>
                    </div>
                    {authStatus && (
                        <div className='mx-1 md:mx-5 my-auto font-bold flex items-center'>
                            <h1>Hello, {userData.name}!</h1>
                            {profilePictureLoading ? <h1 className='text-white mx-2'>...</h1>
                                : <img
                                    src={imageUrl}
                                    alt="profile picture"
                                    width="50px"
                                    className="rounded-full mx-2 shadow-lg border-2 border-white hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                                    onClick={() => navigate('/user-tweets')}
                                />
                            }
                        </div>
                    )}
                    <ul className='flex ml-auto'>
                        {navItems.map(item =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock mx-1 my-1 px-1 md:px-5 py-1 duration-200 font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:text-white'
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
