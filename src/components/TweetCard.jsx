import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from './LikeBtn'
import appwriteService from '../appwrite/config'

function TweetCard(tweet) {
    return (
        <div className="w-1/2 mx-auto rounded-md shadow-lg overflow-hidden my-6 shadow-[0px_0px_2px_rgba(255,255,255,1)]">
        {/* <div className="max-w-md mx-auto rounded-sm shadow-lg overflow-hidden my-6 shadow-[0px_0px_2px_rgba(255,255,255,1)]"> */}
            <Link to={`/tweet/${tweet.$id}`}>
                <div className="p-4 transition duration-300 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600">
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
