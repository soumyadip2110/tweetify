import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Button } from './index';
import { useSelector } from 'react-redux';

function Story() {
    const { slug } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false)
    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getStory(slug)
            .then(story => setStory(story))
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleDeleteStory = () => {
        setDeleting(true);
        appwriteService.deleteStory(slug)
            .then(() => navigate('/'));
    }

    return loading ? <h1 className='mt-[2rem] md:mt-[1rem]'>Loading...</h1>
        : story ? (
            <Container className="mt-[2rem] md:mt-[1rem] max-w-3xl mx-auto p-4 bg-gray-300 shadow-lg rounded-lg border border-gray-200">
                <div className="space-y-3">
                    {/* User Name */}
                    <div className="text-sm font-semibold text-gray-800">{story.userName}:</div>

                    {/* Story Content */}
                    <div className="text-gray-700 text-xl font-bold break-words">{story.content}</div>

                    {/* Upload Date/Time */}
                    <div className="text-xs text-gray-500 mt-2">{story.uploadDateTime}</div>

                    {/* Delete Button */}
                    <div className="flex items-center justify-end mt-4">
                        {userData?.$id === story.userId && (
                            <Button
                                disabled={deleting}
                                onClick={() => handleDeleteStory(story.$id)}
                                className={`px-4 py-2 active:bg-red-700 text-xs font-semibold rounded-md focus:outline-none focus:ring-2 transition duration-200 
          ${deleting ? 'bg-red-300 text-white cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                            >
                                {!deleting ? 'Delete' : 'Deleting'}
                            </Button>
                        )}
                    </div>
                </div>
            </Container>

        ) : <h1 className='mt-[2rem] md:mt-[1rem]'>Story unavalibale</h1>
}

export default Story
