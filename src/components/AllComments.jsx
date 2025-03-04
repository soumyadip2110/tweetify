import React, { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Button, Container } from './index'
import { useSelector } from 'react-redux';

function Comments({ comments, deleteComment }) {
    const userData = useSelector(state => state.auth.userData);
    const [deleteId, setDeleteId] = useState(null);
    const handleDeleteComment = (commentId) => {
        setDeleteId(commentId);
        appwriteService.deleteComment(commentId)
            .then(() => {
                deleteComment();
            })
    }

    return (
        <Container className='w-full max-w-3xl mx-auto p-4'>
            <h1 className='mx-2 mb-2 text-left text-lg'>{comments.length} comments:</h1>
            {comments.map((comment) => (
                <div
                    key={comment.$id}
                    className="bg-gray-400 px-4 py-3 mb-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="text-gray-700 mb-2 flex items-start justify-between space-x-2">
                        <div className="flex items-start space-x-2">
                            <div className="font-bold">{comment.userName}:</div>
                            <div className="text-gray-700 break-words max-w-lg text-left">{comment.comment}</div>
                        </div>
                        <div className="text-xs text-gray-500">{comment.timeStamp}</div>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                        {userData.$id === comment.userId && (
                            <Button
                                disabled={deleteId === comment.$id}
                                onClick={() => handleDeleteComment(comment.$id)}
                                className={`px-3 py-1 active:bg-red-700 text-xs font-semibold rounded-md focus:outline-none focus:ring-2 transition duration-200
                                ${deleteId === comment.$id
                                        ? 'bg-red-300 text-white cursor-not-allowed'
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`
                                }
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </Container>
    )
}

export default Comments
