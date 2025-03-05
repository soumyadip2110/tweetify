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
            <Container>
                <div>{story.userName}</div>
                <div>{story.content}</div>
                <div>{story.uploadDateTime}</div>
                <div className="flex items-center justify-end mt-2">
                    {userData?.$id === story.userId && (
                        <Button
                            disabled={deleting}
                            onClick={() => handleDeleteStory(story.$id)}
                            className='px-3 py-1 active:bg-red-700 text-xs font-semibold rounded-md focus:outline-none focus:ring-2 transition duration-200 bg-red-500 hover:bg-red-600 text-white'
                        >
                            {!deleting ? 'Delete' : 'Deleting'}
                        </Button>
                    )}
                </div>
            </Container>
        ) : <h1 className='mt-[2rem] md:mt-[1rem]'>Story unavalibale</h1>
}

export default Story
