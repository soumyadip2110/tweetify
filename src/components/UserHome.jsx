import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, TweetCard } from '../components';
import appwriteService from '../appwrite/config'
import { data, useParams } from 'react-router-dom';

function UserHome() {
    const fileInputRef = useRef(null);
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData);
    const [userTweets, setUserTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = slug ? slug : userData.$id;
    const [message, setMessage] = useState('')
    const [notFoundMessage, setNotFoundMessage] = useState('')
    const [imageUrl, setImageUrl] = useState(null);
    const imageNotFoundUrl = 'https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg'
    const [triggerProfilePictureChange, setTriggerProfilePictureChange] = useState(false);

    useEffect(() => {
        setLoading(true);
        appwriteService.getUserTweets(userId)
            .then((tweets) => {
                setUserTweets(tweets.documents.reverse())
                if (tweets?.documents.length > 0) {
                    setMessage(
                        !slug ? `Hi ${userData.name}, here are all of your posts:`
                            : `${tweets.documents[0].userName}'s posts`
                    )
                } else {
                    setNotFoundMessage(!slug ? "You haven't posted any tweets yet!" : 'No tweets available')
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            });
    }, [slug]);

    useEffect(() => {
        appwriteService.getProfilePicturePreview(userId)
            .then(data => setImageUrl(data))
            .catch(e => console.log(e))
    }, [slug, triggerProfilePictureChange])

    const handleUpdatePhoto = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (imageUrl) appwriteService.deleteProfilePicture(userId)
            appwriteService.uploadProfilePicture(userId, file)
                .then(() => setTriggerProfilePictureChange(prev => !prev))
        }
    }

    return loading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>Loading...</h1>
        : userTweets.length > 0 ? (
            <Container className='mt-[2rem] md:mt-[1rem]'>
                <img
                    src={imageUrl ? imageUrl : imageNotFoundUrl}
                    alt="profile picture"
                    width="100px"
                    className="rounded-full mx-auto mt-2 shadow-lg border-4 border-gray-500 hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                />
                <Button
                    className={`text-xs m-2 ${slug ? 'hidden' : null}`}
                    px='1'
                    py='1'
                    onClick={handleUpdatePhoto}
                >
                    update photo
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <h1 className='text-2xl text-white font-bold'>
                    {message}
                </h1>
                {
                    userTweets.map(tweet => (
                        <div key={tweet.$id}>
                            <TweetCard {...tweet} />
                        </div>
                    ))
                }
            </Container>
        )
            : <h2 className='mt-[2rem] md:mt-[1rem] text-white'>
                {notFoundMessage}
            </h2>
}

export default UserHome