import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import appwriteService from '../../appwrite/config'

function StoryCard(story) {
    const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg';

    const [profilePictureLoading, setProfilePictureLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(imageNotFoundUrl);

    useEffect(() => {
        if (story) {
            setProfilePictureLoading(true);
            appwriteService.getProfilePicturePreview(story.userId)
                .then(data => {
                    if (data) setImageUrl(data)
                    else setImageUrl(imageNotFoundUrl);
                })
                .catch(e => console.log(e))
                .finally(() => setProfilePictureLoading(false));
        }
    }, []);

    return (
        <Link to={`/story/${story.$id}`}>
            <div className='text-sm font-bold'>
                {profilePictureLoading ? <h1 className='text-white mx-2'>...</h1>
                    : <img
                        src={imageUrl}
                        alt="profile picture"
                        width="70px"
                        className="rounded-full mx-1 shadow-lg border-2 border-white hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                    />
                }
                <h1>{story.userName ? story.userName : 'Username not found!'}</h1>
            </div>
        </Link>
    )
}

export default StoryCard
