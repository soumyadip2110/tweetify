import React, { useEffect, useState } from 'react'
import { Button } from '../index'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'

function LikeBtn({ tweet, className='' }) {
    const [likeCount, setLikeCount] = useState(0)
    const [liked, setLiked] = useState(false)
    const [updateLike, setUpdateLike] = useState(false)
    const [likeLoading, setLikeLoading] = useState(true)
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        appwriteService.getLikes(tweet.$id, true)
            .then((likes) => {
                setLikeCount(likes.length)
                setLiked(likes.some(like => like.userId === userData.$id));
            })
            .finally(() => {
                setLikeLoading(false)
            });
    }, [updateLike])

    const handleLikeUnlike = () => {
        setLiked(prev => !prev)
        setLikeCount(prev => prev + (!liked ? 1 : -1))
        setLikeLoading(true);
        appwriteService.likeTweet({
            tweetId: tweet.$id,
            userId: userData.$id
        })
            .then(() => setUpdateLike(prev => !prev))
            .catch(err => console.log(err));
    }

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <Button
                onClick={handleLikeUnlike}
                disabled={likeLoading}
                px='2'
                py='1'
                className={
                    `flex items-center justify-center rounded-full border transition duration-300
                    ${liked ? 'bg-white border-gray-200 hover:bg-gray-400'
                        : 'bg-gray-400 border-gray-600 hover:bg-gray-500'
                    }`
                }
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`h-5 w-5 ${liked ? 'text-red-500' : 'text-white'}`}
                >
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.293l1.172-1.121a4 4 0 115.656 5.657l-6 6a1 1 0 01-1.414 0l-6-6a4 4 0 010-5.657z" clipRule="evenodd" />
                </svg>
            </Button>

            <div className="text-sm text-gray-300">
                {likeCount}
            </div>
        </div>
    )
}

export default LikeBtn