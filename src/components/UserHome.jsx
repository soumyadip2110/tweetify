import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Tooltip, TweetCard } from '../components';
import appwriteService from '../appwrite/config'
import { useParams } from 'react-router-dom';

function UserHome() {
    const fileInputRef = useRef(null);
    const userData = useSelector(state => state.auth.userData);
    const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg';
    // const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg';
    const { slug } = useParams();
    const userId = slug ? slug : userData.$id;

    const [loading, setLoading] = useState(true);
    const [profilePictureLoading, setProfilePictureLoading] = useState(true);
    const [userTweets, setUserTweets] = useState([]);
    const [message, setMessage] = useState('');
    const [notFoundMessage, setNotFoundMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(imageNotFoundUrl);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [triggerProfilePictureChange, setTriggerProfilePictureChange] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        setLoading(true);
        appwriteService.getUserTweets(userId)
            .then((tweets) => {
                setUserTweets(tweets.documents.reverse())
                if (tweets?.documents.length > 0) {
                    setMessage(
                        tweets.documents[0].userName
                        // !slug ? `Hi ${userData.name}, here are all of your posts:`
                        //     : `${tweets.documents[0].userName}'s posts`
                    )
                } else {
                    setNotFoundMessage(!slug ? "You haven't posted any tweets yet!" : 'No tweets available')
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [slug]);

    useEffect(() => {
        setProfilePictureLoading(true);
        appwriteService.getProfilePicturePreview(userId)
            .then(data => {
                if (data) setImageUrl(data)
                else setImageUrl(imageNotFoundUrl);
            })
            .catch(e => console.log(e))
            .finally(() => setProfilePictureLoading(false));
    }, [slug, triggerProfilePictureChange])

    const handleUpdatePhoto = () => {
        fileInputRef.current.click();
    }

    const handleDeletePhoto = () => {
        setDeleting(true);
        setProfilePictureLoading(true)
        appwriteService.deleteProfilePicture(userId)
            .then(() => setImageUrl(imageNotFoundUrl))
            .catch(e => console.log(e))
            .finally(() => {
                setProfilePictureLoading(false);
                setDeleting(false);
            });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePictureLoading(true)
            appwriteService.uploadProfilePicture(userId, file)
                .then(() => {
                    if (imageUrl !== imageNotFoundUrl) {
                        appwriteService.deleteProfilePicture(userId)
                            .then(() => setTriggerProfilePictureChange(prev => !prev))
                    } else {
                        setTriggerProfilePictureChange(prev => !prev)
                    }
                })
                .catch(e => console.log(e));
        }
    }

    const handleEscapeKey = useCallback((e) => {
        if (e.key === 'Escape') {
            setIsImageOpen(false)
        }
    }, [])

    useEffect(() => {
        if (isImageOpen) {
            window.addEventListener('keyup', handleEscapeKey);
        }
        return () => {
            window.removeEventListener('keyup', handleEscapeKey);
        };
    }, [isImageOpen, handleEscapeKey])

    return loading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>Loading...</h1>
        : userTweets.length > 0 ? (
            <Container className='mt-[2rem] md:mt-[1rem]'>
                {profilePictureLoading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>...</h1>
                    :
                    (imageUrl === imageNotFoundUrl ?
                        (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    height='60px'
                                    fill='#fff'
                                    className='border-2 rounded-full p-2 mx-auto'
                                >
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                                </svg>
                        ) :
                        (
                            <img
                                src={imageUrl}
                                alt="profile picture"
                                width="100px"
                                className="rounded-full mx-auto mt-2 shadow-lg border-2 border-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                                onClick={() => setIsImageOpen(true)}
                            />
                        )
                    )
                }
                {/* Image full screen */}
                {isImageOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <img
                            src={imageUrl}
                            alt='profile picture'
                            className="cursor-pointer max-w-full h-full object-contain"
                        />
                    </div>
                )}
                {/* <Button
                    className={`text-xs m-2 ${slug ? 'hidden' : null}`}
                    px='1'
                    py='1'
                    onClick={handleUpdatePhoto}
                >
                    update photo
                </Button> */}

                {/* <Button
                    className={`text-xs m-2 ${(slug || (imageUrl === imageNotFoundUrl)) ? 'hidden' : null}`}
                    disabled={deleting}
                    px='1'
                    py='1'
                    bgColor='bg-red-700'
                    onClick={handleDeletePhoto}
                >
                    Delete
                </Button> */}

                <div className={`flex justify-center m-2 cursor-pointer ${slug ? 'hidden' : null}`}>
                {/* <div className={`flex justify-center m-2 space-x-5 cursor-pointer ${slug ? 'hidden' : null}`}> */}
                    {/* Upload */}
                    <div className='group'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            height='20px'
                            fill='#74C0FC'
                            // fill='#1100ff'
                            onClick={handleUpdatePhoto}
                            className='hover:scale-110 duration-300 mx-2'
                        >
                            <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z" />
                        </svg>
                        <Tooltip tabName='upload' y='1' />
                    </div>
                    {/* Delete */}
                    <div className='group'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            height='20px'
                            fill='#ff0000'
                            disabled={deleting}
                            onClick={handleDeletePhoto}
                            className={`mx-2 hover:scale-110 duration-300 ${imageUrl === imageNotFoundUrl ? 'hidden' : null}`}
                        >
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                        <Tooltip tabName='delete' y='1' />
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <h1 className='text-2xl text-white font-bold mb-2'>
                    {message}
                </h1>
                {
                    userTweets.map(tweet => (
                        <div key={tweet.$id}>
                            <TweetCard {...tweet} />
                        </div>
                    ))
                }
            </Container>
        )
            : <h2 className='mt-[2rem] md:mt-[1rem] text-white'>
                {notFoundMessage}
            </h2>
}

export default UserHome