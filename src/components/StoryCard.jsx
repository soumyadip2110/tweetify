import { Link } from 'react-router-dom'
import React from 'react'

function StoryCard(story) {
    return (
        <div className='border'>
            <Link to={`/story/${story.$id}`}>
                <div>{story.userName}</div>
            </Link>
        </div>
    )
}

export default StoryCard
