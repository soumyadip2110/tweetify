import React, { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Button } from './index'
import { useSelector } from 'react-redux'

function AddComment({ tweetId, addComment }) {
    const [comment, setComment] = useState('');
    const userData = useSelector(state => state.auth.userData);

    const d = new Date()
    const date = d.toLocaleDateString('en-IN')
    const time = d.toLocaleTimeString('en-IN')

    const handleComment = async () => {
        try {
            const newComment = await appwriteService.createComment({
                tweetId: tweetId,
                userId: userData.$id,
                comment: comment,
                timeStamp: date + ' - ' + time,
                userName: userData.name
            });
            addComment(newComment);
            setComment('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='border flex justify-center flex-col w-1/2 mx-auto'>
            <label>Add a comment:</label>
            <textarea
                rows='2'
                className='bg-gray-600 p-1'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength='250'
            />
            <Button onClick={handleComment}>Comment</Button>
        </div>
    )
}

export default AddComment
