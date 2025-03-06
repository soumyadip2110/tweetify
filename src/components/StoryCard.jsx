import { Link } from 'react-router-dom'
import React from 'react'
import Container from './container/Container'

function StoryCard(story) {
    return (
        <Container className='border-2 rounded-3xl p-1 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 hover:scale-105 duration-300'>
            <Link to={`/story/${story.$id}`}>
                <div className='text-sm font-bold'>{story.userName}</div>
            </Link>
        </Container>
    )
}

export default StoryCard
