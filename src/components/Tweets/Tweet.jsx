import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux';
import { AddComment, AllComments, Button, Container, LikeBtn } from '../index'

function Tweet() {
    const [tweet, setTweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = tweet && userData ? tweet.userId === userData.$id : false;
    const navigate = useNavigate()
    const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg';

    const [profilePictureLoading, setProfilePictureLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(imageNotFoundUrl);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(true);
    const [triggerCommentDelete, setTriggerCommentDelete] = useState(true);

    useEffect(() => {
        appwriteService.getTweet(slug)
            .then((tweet) => {
                setTweet(tweet);
                getProfilePicture(tweet.userId);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));

        appwriteService.getTweetComments(slug)
            .then(allComments => setComments(allComments.documents.reverse()))
            .catch(err => console.log(err))
            .finally(() => setCommentLoading(false));
    }, [slug, triggerCommentDelete]);

    const getProfilePicture = (userId) => {
        setProfilePictureLoading(true);
        appwriteService.getProfilePicturePreview(userId)
            .then(data => {
                if (data) setImageUrl(data)
                else setImageUrl(imageNotFoundUrl);
            })
            .catch(e => console.log(e))
            .finally(() => setProfilePictureLoading(false));
    }

    const addComment = (newComment) => {
        setComments(prevComment => [newComment, ...prevComment])
    }

    const deleteComment = () => {
        setTriggerCommentDelete(prev => !prev);
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
            <Container className="mt-[2rem] md:mt-[0rem] w-2/3">

                {/* Tweet */}
                <div className="p-3 pt-1 text-white rounded-lg shadow-lg overflow-hidden">
                    <div
                        onClick={() => navigate(isAuthor ? '/user-tweets' : `/user/${tweet.userId}`)}
                        className="flex items-center px-2 py-1 text-left font-semibold text-white text-sm mx-0 mb-2 border-b border-gray-700 cursor-pointer"
                    >
                        {profilePictureLoading ? <h1 className='text-white mx-2'>...</h1>
                            : <img
                                src={imageUrl}
                                alt="profile picture"
                                width="30px"
                                className="rounded-full mx-1 mb-1 shadow-lg border-2 border-white hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                            />
                        }
                        <h1>{tweet.userName ? tweet.userName : 'Username not found!'}</h1>
                    </div>
                    {tweet.featuredImage && (
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="w-full md:w-1/2 mx-auto object-contain max-h-screen hover:cursor-pointer rounded-lg"
                            onClick={() => setIsImageOpen(true)}
                        />

                    )}
                    <div className="border-b border-gray-700 px-6 py-1 my-2">
                        <h3 className="text-xl font-semibold break-words text-left">{tweet.content}</h3>
                    </div>
                    <div className="mt-2 px-2 py-0 flex items-center justify-between">
                        <p className="text-sm text-gray-300">{tweet.timestamp}</p>
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

                {/* Image full screen */}
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

                {/* Comments section */}
                <AddComment tweetId={tweet.$id} addComment={addComment} />

                {commentLoading ? <h1 className='mt-[2rem] md:mt-[1rem]'>Loading comments...</h1>
                    : comments.length > 0 ?
                        <AllComments comments={comments} deleteComment={deleteComment} />
                        : <h2 className='border-t m-4 text-white'> No comments available </h2>
                }
            </Container>
        ) : <h1 className='mt-[2rem] md:mt-[1rem]'>Tweet unavalibale</h1>
}

export default Tweet
