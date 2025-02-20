import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from './LikeBtn'
import appwriteService from '../appwrite/config'

function TweetCard(tweet) {
    return (
        <div className="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden my-4 shadow-[0px_1px_2px_rgba(255,255,255,1)]">
        {/* <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-4"> */}
            <Link to={`/tweet/${tweet.$id}`}>
                <div className="p-4 transition duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
                    
                    {tweet.featuredImage && (
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                    )}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">{tweet.content}</h3>
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
