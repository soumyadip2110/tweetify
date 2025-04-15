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
            name: 'My Tweets',
            slug: '/user-tweets',
            active: authStatus
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
    ];

    useEffect(() => {
        if (authStatus && userData) {
            setProfilePictureLoading(true);
            appwriteService.getProfilePicturePreview(userData?.$id)
                .then(data => {
                    if (data) setImageUrl(data)
                    else setImageUrl(imageNotFoundUrl);
                })
                .catch(e => console.log(e))
                .finally(() => setProfilePictureLoading(false));
        }
    }, [authStatus])

    return (
        <header className='py-1 m-0 top-0 sticky w-full bg-gray-900 drop-shadow-[0px_1px_2px_rgba(255,255,255,1)]'>
            <Container>
                <nav className='flex text-xs md:text-lg'>
                    <div className='mx-1 md:mx-5 my-auto font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent duration-200'>
                        <Link to='/'>
                            Tweetify
                        </Link>
                    </div>
                    {authStatus && (
                        <div className='mx-1 md:mx-5 my-auto font-bold flex items-center'>
                            <h1>Hi, {userData.name}!</h1>
                            {profilePictureLoading ? <h1 className='text-white mx-2'>...</h1>
                                : <img
                                    src={imageUrl}
                                    alt="profile picture"
                                    width="40px"
                                    className="rounded-full mx-2 shadow-lg border-2 border-white hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                                    onClick={() => navigate('/user-tweets')}
                                />
                            }
                        </div>
                    )}
                    <ul className='flex ml-auto items-center'>
                        {navItems.map(item =>
                            item.active ? (
                                <li key={item.name} className='flex items-center'>
                                    {item.name !== 'Add Story' ?
                                        (
                                            <svg
                                                onClick={() => navigate(item.slug)}
                                                className='cursor-pointer m-1 md:m-4 hover:scale-110 duration-200'
                                                xmlns="http://www.w3.org/2000/svg"
                                                height='20px'
                                                fill='#fff'
                                                viewBox="0 0 576 512"
                                            >
                                                {item.name === 'Home' ?
                                                    (
                                                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                                    ) :
                                                    (item.name === 'Add Tweet' ?
                                                        (
                                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                                        ) :
                                                        (item.name === 'My Tweets' ?
                                                            (
                                                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                                                            ) :
                                                            (null)
                                                        )
                                                    )
                                                }
                                            </svg>
                                        ) :
                                        (
                                            <button
                                                onClick={() => navigate(item.slug)}
                                                className='inline-bock mx-1 my-1 px-1 md:px-2 py-1 duration-200 font-bold hover:text-gray-400'
                                            >
                                                {item.name}
                                            </button>
                                        )
                                    }








                                    {/* <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock mx-1 my-1 px-1 md:px-5 py-1 duration-200 font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:text-white'
                                    >
                                        {item.name}
                                    </button> */}
                                    {/* {item.name === 'Home' ?
                                        (
                                            <svg
                                                onClick={() => navigate(item.slug)}
                                                className='cursor-pointer'
                                                xmlns="http://www.w3.org/2000/svg"
                                                height='20px'
                                                fill='#fff'
                                                viewBox="0 0 576 512"
                                            >
                                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                            </svg>
                                        ) :
                                        (item.name === 'Add Tweet' ?
                                            (
                                                <svg
                                                    onClick={() => navigate(item.slug)}
                                                    className='cursor-pointer'
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height='20px'
                                                    fill='#fff'
                                                    viewBox="0 0 576 512"
                                                >
                                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                                </svg>
                                            ) :
                                            (item.name === 'My Tweets' ?
                                                (
                                                    <svg
                                                        onClick={() => navigate(item.slug)}
                                                        className='cursor-pointer'
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height='20px'
                                                        fill='#fff'
                                                        viewBox="0 0 576 512"
                                                    >
                                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                                                    </svg>
                                                ) :
                                                (
                                                    <button
                                                        onClick={() => navigate(item.slug)}
                                                        className='inline-bock mx-1 my-1 px-1 md:px-5 py-1 duration-200 font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:text-white'
                                                    >
                                                        {item.name}
                                                    </button>
                                                )

                                            )
                                        )
                                    } */}
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
        </header >
    )
}

export default Header
