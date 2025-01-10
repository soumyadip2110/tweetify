import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from './LikeBtn'


function TweetCard(tweet) {
    return (
        <div className='bg-blue-700'>
            <Link to={`/tweet/${tweet.$id}`}>
                <div className='bg-blue-700 m-2'>
                    <div>
                        <h3>{tweet.content}</h3>
                    </div>
                    <div>
                        <p>{tweet.timestamp}</p>
                    </div>
                </div>
            </Link>
            <LikeBtn tweet={tweet} />
        </div>
    )
}

export default TweetCard
