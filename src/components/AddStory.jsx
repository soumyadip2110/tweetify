import React, { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Button, Input } from './index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AddStory() {
    const [content, setContent] = useState('');
    const [postStoryMsg, setPostStoryMsg] = useState('Post');
    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    const d = new Date()
    const date = d.toLocaleDateString('en-IN')
    const time = d.toLocaleTimeString('en-IN')

    const handleStory = async (e) => {
        e.preventDefault();
        if(content.length > 0){
            setPostStoryMsg('Posting...');
            try {
                const post = await appwriteService.createStory({
                    userId: userData.$id,
                    userName: userData.name,
                    content: content,
                    timeStamp: new Date().toISOString(),
                    uploadDateTime: date + ' - ' + time
                });
                setContent('');
                setPostStoryMsg('Post');
                if (post) navigate(`/story/${post.$id}`)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto p-0 mt-2">
            <form onSubmit={handleStory} className="space-y-1 bg-gray-600 px-4 py-1 pb-2 rounded-lg shadow-md">
                <label className="text-md font-semibold text-gray-100">
                    Add content to your story:
                </label>
                <Input
                    rows="1"
                    className="mb-1 w-full bg-gray-100 text-sm text-gray-800 p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength="250"
                    placeholder="Write your comment here..."
                />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">{content.length}/250</span>
                    <Button
                        type="submit"
                        disabled={postStoryMsg !== 'Post'}
                        className="bg-blue-600 hover:bg-blue-700 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        px='2'
                        py='0'
                    >
                        {postStoryMsg}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddStory
