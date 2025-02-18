import React, { useState } from 'react'
import { Input, Button } from './index'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom';

function AddTweet() {
    const [tweet, setTweet] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();

    const d = new Date()
    const time = d.toLocaleTimeString()
    const date = d.toLocaleDateString()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let file;
            if (image) {
                file = await appwriteService.uploadImage(image)
            }
            const post = await appwriteService.createTweet({
                content: tweet,
                userId: userData.$id,
                timestamp: time + ' ' + date,
                featuredImage: image ? file.$id : ''
            });
            if (post) {
                navigate(`/tweet/${post.$id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            setImage(imageFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(imageFile);
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
                    <Input
                        type='file'
                        label='Upload image:'
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        onChange={handleImageUpload}
                    />
                    {imagePreview && <img src={imagePreview} alt='image' height='300px' width='300px'/>}
                    <Button
                        type='submit'
                        className={`mt-2 ${tweet.length > 0 ? 'hover:bg-blue-800' : 'bg-blue-900'}`}
                        disabled={tweet.length === 0}
                    >
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddTweet
