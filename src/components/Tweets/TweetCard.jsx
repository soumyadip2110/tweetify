import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LikeBtn } from '../index'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'

function TweetCard(tweet) {
    const userData = useSelector(state => state.auth.userData)
    const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg';

    const [commentCount, setCommentCount] = useState(0);
    const [profilePictureLoading, setProfilePictureLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(imageNotFoundUrl);

    useEffect(() => {
        appwriteService.getTweetComments(tweet.$id)
            .then(allComments => setCommentCount(allComments.documents.length))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setProfilePictureLoading(true);
        appwriteService.getProfilePicturePreview(tweet.userId)
            .then(data => {
                if (data) setImageUrl(data)
                else setImageUrl(imageNotFoundUrl);
            })
            .catch(e => console.log(e))
            .finally(() => setProfilePictureLoading(false));
    }, [])

    return (
        <div className="text-left w-full sm:w-2/3 md:w-1/2 p-1 mx-auto rounded-md shadow-lg overflow-hidden mb-6 border border-gray-700">
            <div className='px-1'>
                <Link to={tweet.userName === userData.name ? '/user-tweets' : `/user/${tweet.userId}`}
                    className="font-semibold text-white text-sm mx-1 flex items-center"
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
                </Link>
            </div>
            <Link to={`/tweet/${tweet.$id}`}>
                <div className="border-b border-t border-gray-600 p-4 transition rounded-md duration-300 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 hover:from-black hover:via-gray-800 hover:to-black">
                    {tweet.featuredImage && (
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                    )}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white break-words">{tweet.content}</h3>
                    </div>
                </div>
            </Link>
            <div className="flex justify-between py-1 px-2">
                <p className="text-sm text-gray-300">{tweet.timestamp}</p>
                <div className='text-sm text-gray-300 flex space-x-2 items-center'>
                    <p>{commentCount} comments</p>
                    <LikeBtn tweet={tweet} />
                </div>
            </div>
        </div>
    )
}

export default TweetCard
