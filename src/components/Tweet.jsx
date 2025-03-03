import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { Button, Container, LikeBtn } from './index'

function Tweet() {
    const [tweet, setTweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = tweet && userData ? tweet.userId === userData.$id : false;
    const navigate = useNavigate()
    const [isImageOpen, setIsImageOpen] = useState(false);


    useEffect(() => {
        appwriteService.getTweet(slug)
            .then((tweet) => {
                setTweet(tweet);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            });
    }, [slug]);

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

    const handleDelete = () => {
        setLoading(true)
        appwriteService.deleteTweet(tweet.$id)
            .then((status) => {
                if (status && tweet.featuredImage) {
                    appwriteService.deleteImage(tweet.featuredImage);
                }
                navigate('/')
            })
    }

    return loading ? <h1 className='mt-[2rem] md:mt-[1rem]'>Loading...</h1>
        : tweet ? (
            <Container className="mt-[2rem] md:mt-[1rem] w-2/3">
                <div className="p-3 pt-1 text-white rounded-lg shadow-lg overflow-hidden">
                    <div
                        onClick={()=>navigate(isAuthor ? '/user-tweets' : `/user/${tweet.userId}`)}
                        className="px-2 py-1 text-left font-semibold text-white text-sm mx-0 mb-2 border-b border-gray-700 cursor-pointer"
                    >
                        {tweet.userName ? tweet.userName : 'Username not found!'}
                    </div>
                    {tweet.featuredImage && (
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="w-full md:w-1/2 mx-auto object-contain max-h-screen hover:cursor-pointer rounded-lg"
                            onClick={() => setIsImageOpen(true)}
                        />

                    )}
                    <div className="border-b border-gray-700 px-6 py-1">
                        <h3 className="text-xl font-semibold">{tweet.content}</h3>
                    </div>
                    <div className="px-2 py-0 flex items-center justify-between">
                        <p className="text-sm text-gray-300 mt-1">{tweet.timestamp}</p>
                        <div className='flex mt-1'>
                            {isAuthor && (
                                <Button
                                    className="text-xs mx-4 mt-1 text-red-500 font-bold hover:bg-red-800"
                                    bgColor='bg-red-700'
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            )}
                            <LikeBtn className='mt-1' tweet={tweet} />
                        </div>
                    </div>
                </div>

                {isImageOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="cursor-pointer max-w-full h-full object-contain"
                        />
                    </div>
                )}
            </Container>







            // <Container className='mt-[5rem]'>
            //     <div className='bg-blue-700'>
            //         {tweet.featuredImage &&
            //             <img
            //                 src={appwriteService.getImagePreview(tweet.featuredImage)}
            //                 alt={tweet.content}
            //                 height='470px'
            //                 width='670px'
            //             />
            //         }
            //         <div>
            //             <h3>{tweet.content}</h3>
            //         </div>
            //         <div>
            //             <p>{tweet.timestamp}</p>
            //         </div>
            //         <LikeBtn tweet={tweet} />
            //         {
            //             isAuthor ? (
            //                 <Button
            //                     className='text-xs'
            //                     onClick={handleDelete}
            //                 >
            //                     Delete
            //                 </Button>
            //             ) : null
            //         }
            //     </div>
            // </Container>
        ) : <h1 className='mt-[2rem] md:mt-[1rem]'>Tweet unavalibale</h1>
}

export default Tweet
