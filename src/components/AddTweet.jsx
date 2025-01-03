import React, { useState } from 'react'
import { Input, Button } from './index'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom';

function AddTweet() {
    const [tweet, setTweet] = useState('');
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();

    const d = new Date()
    const time = d.toLocaleTimeString()
    const date = d.toLocaleDateString()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            const post = await appwriteService.createTweet({
                content: tweet,
                userId: userData.$id,
                timestamp: time + ' ' + date
            });
            if (post) {
                console.log('post: ', post);
                console.log('$id: ', post.$id);
                
                navigate(`/tweet/${post.$id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            <h1 className='text-black'>Post your tweet</h1>
            <form className='mt-8' onSubmit={handleSubmit}>
                <div className=''>
                    <Input
                        type='textarea'
                        placeholder="What's on your mind?"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    />
                    <Button
                        type='submit'
                        className='mt-2 hover:bg-blue-800'
                    >
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddTweet
