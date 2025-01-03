import React from 'react'
import { Link } from 'react-router-dom'


function TweetCard(tweet) {
    return (
        <div>
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
        </div>
    )
}

export default TweetCard
