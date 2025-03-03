import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from './LikeBtn'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function TweetCard(tweet) {
    const userData = useSelector(state => state.auth.userData)
    return (
        <div className="text-left w-full sm:w-2/3 md:w-1/2 p-1 mx-auto rounded-md shadow-lg overflow-hidden my-6 shadow-[0px_0px_1px_rgba(255,255,255,0.4)]">
            <div className='px-1'>
                <Link to={tweet.userName === userData.name ? '/user-tweets' : `/user/${tweet.userId}`}
                    className="font-semibold text-white text-sm mx-1"
                >
                    {tweet.userName ? tweet.userName : 'Username not found!'}
                </Link>
            </div>
            <Link to={`/tweet/${tweet.$id}`}>
                <div className="p-4 transition rounded-md duration-300 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 hover:from-black hover:via-gray-800 hover:to-black">
                    {tweet.featuredImage && (
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                    )}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{tweet.content}</h3>
                    </div>
                </div>
            </Link>
            <div className="flex justify-between py-1 px-2">
                <p className="text-sm text-gray-300">{tweet.timestamp}</p>
                <LikeBtn tweet={tweet} />
            </div>
        </div>
    )
}

export default TweetCard
