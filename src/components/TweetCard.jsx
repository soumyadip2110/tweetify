import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from './LikeBtn'
import appwriteService from '../appwrite/config'

function TweetCard(tweet) {
    return (
        <div className='bg-blue-700'>
            <Link to={`/tweet/${tweet.$id}`}>
                <div className='bg-blue-700 m-2'>
                    {tweet.featuredImage &&
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            height='250px'
                            width='250px'
                        />
                    }
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
