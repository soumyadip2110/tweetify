import React from 'react'
import { Link } from 'react-router-dom'

function TweetCard({$id, content, timestamp}) {
    return (
        <>
        {/* <Link to={`/tweet/${$id}`}> */}
            <div className='bg-blue-700'>
                <div>
                    <h3>{content}</h3>
                </div>
                <div>
                    <p>{timestamp}</p>
                </div>
            </div>
        {/* </Link> */}
        </>
    )
}

export default TweetCard
