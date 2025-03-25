import React, { useState } from 'react'
import appwriteService from '../../appwrite/config'
import { Button, Input } from '../index'
import { useSelector } from 'react-redux'

function AddComment({ tweetId, addComment }) {
    const [comment, setComment] = useState('');
    const [postCommentMsg, setPostCommentMsg] = useState('Post');
    const userData = useSelector(state => state.auth.userData);

    const d = new Date()
    const date = d.toLocaleDateString('en-IN')
    const time = d.toLocaleTimeString('en-IN')

    const handleComment = async (e) => {
        e.preventDefault();
        if(comment.length > 0){
            setPostCommentMsg('Posting...');
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
                setPostCommentMsg('Post');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto p-0 mt-2">
            <form onSubmit={handleComment} className="space-y-1 bg-gray-600 px-4 py-1 pb-2 rounded-lg shadow-md">
                <label htmlFor="comment" className="text-md font-semibold text-gray-100">
                    Add a comment:
                </label>
                <Input
                    rows="1"
                    className="mb-1 w-full bg-gray-100 text-sm text-gray-800 p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength="250"
                    placeholder="Write your comment here..."
                />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">{comment.length}/250</span>
                    <Button
                        type="submit"
                        disabled={postCommentMsg !== 'Post'}
                        className="bg-blue-600 hover:bg-blue-700 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        px='2'
                        py='0'
                    >
                        {postCommentMsg}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddComment
