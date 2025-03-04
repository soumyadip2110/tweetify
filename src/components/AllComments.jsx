import React from 'react'
import appwriteService from '../appwrite/config'
import { Button, Container } from './index'

function Comments({ comments, deleteComment }) {
    const handleDeleteComment = (commentId) => {
        appwriteService.deleteComment(commentId)
            .then(() => {
                deleteComment();
            })
    }

    return (
        <div>
            <Container className='border m-4'>
                {comments.map(comment => (
                    <div key={comment.$id}>
                        <div>{comment.userName}</div>
                        <div>{comment.comment}</div>
                        <div>{comment.timeStamp}</div>
                        <Button
                            onClick={() => handleDeleteComment(comment.$id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Comments
