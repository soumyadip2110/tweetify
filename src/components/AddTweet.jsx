import React, { useRef, useState } from 'react'
import { Input, Button } from './index'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom';

function AddTweet() {
    const fileInputRef = useRef(null);
    const [tweet, setTweet] = useState('');
    const [submitText, setSubmitText] = useState('Post Tweet');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();

    const d = new Date()
    const date = d.toLocaleDateString('en-IN')
    const time = d.toLocaleTimeString('en-IN')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitText('Posting...')
        try {
            let file;
            if (image) {
                file = await appwriteService.uploadImage(image)
            }
            const post = await appwriteService.createTweet({
                content: tweet,
                userId: userData.$id,
                timestamp: date + ' - ' + time,
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

    const handleImageRemove = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    };

    return (
        <div className="mt-[5rem] max-w-2xl mx-auto bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 shadow-[0px_1px_4px_rgba(255,255,255,1)] rounded-xl p-8 space-y-6">
            <h1 className="text-4xl font-extrabold text-white text-center mb-8">What's on Your Mind?</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Textarea */}
                <textarea
                    className="w-full p-6 text-gray-900 bg-blue-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 text-lg placeholder-gray-400"
                    rows="6"
                    placeholder="Share your thoughts..."
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                />

                {/* Image Upload */}
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-white">Upload Image:</label>
                    <input
                        ref={fileInputRef}
                        type='file'
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        onChange={handleImageUpload}
                        className="hover:cursor-pointer text-xs py-1 px-2 bg-white text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mt-6 flex justify-center items-center relative">
                        {/* Remove Button */}
                        <Button
                            onClick={handleImageRemove}
                            bgColor='bg-red-600'
                            textColor='text-white'
                            className="absolute top-2 right-2 border-2 border-red-800 hover:bg-red-700 hover:text-white rounded-full p-2"
                        >
                            Remove
                        </Button>

                        {/* Image Preview */}
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-xs h-auto rounded-xl shadow-lg" // Adjusted size for preview
                        />
                    </div>
                )}



                {/* {imagePreview && (
                    <div className="mt-6 flex justify-center">
                        <Button
                            onClick={handleImageRemove}
                            bgColor='bg-white'
                            textColor='text-red-600'
                            className="border-2 border-red-600 hover:bg-red-600 hover:text-white rounded-full"
                        >
                            Remove
                        </Button>
                        <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-xl shadow-lg" />
                    </div>
                )} */}

                {/* Submit Button */}
                <Button
                    type='submit'
                    className={`w-full py-3 text-lg font-bold text-white rounded-lg transition-all duration-300 ${tweet.length > 0 ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={tweet.length === 0}
                >
                    {submitText}
                </Button>
            </form>
        </div>




        // <div>
        //     <h1 className='text-black'>Post your tweet</h1>
        //     <form className='mt-8' onSubmit={handleSubmit}>
        //         <div className=''>
        //             <Input
        //                 type='textarea'
        //                 placeholder="What's on your mind?"
        //                 value={tweet}
        //                 onChange={(e) => setTweet(e.target.value)}
        //             />
        //             <Input
        //                 type='file'
        //                 label='Upload image:'
        //                 accept="image/png, image/jpg, image/jpeg, image/gif"
        //                 onChange={handleImageUpload}
        //             />
        //             {imagePreview && <img src={imagePreview} alt='image' height='300px' width='300px' />}
        //             <Button
        //                 type='submit'
        //                 className={`mt-2 ${tweet.length > 0 ? 'hover:bg-blue-800' : 'bg-blue-900'}`}
        //                 disabled={tweet.length === 0}
        //             >
        //                 Tweet
        //             </Button>
        //         </div>
        //     </form>
        // </div>
    )
}

export default AddTweet
