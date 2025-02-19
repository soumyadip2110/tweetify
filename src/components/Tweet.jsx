import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { Button, Container, LikeBtn } from './index'

function Tweet() {
    const [tweet, setTweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData);
    const isAuthor = tweet && userData ? tweet.userId === userData.$id : false;
    const navigate = useNavigate()


    useEffect(() => {
        appwriteService.getTweet(slug)
            .then((tweet) => {
                setTweet(tweet);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            });
    }, [slug]);


    const handleDelete = () => {
        setLoading(true)
        appwriteService.deleteTweet(tweet.$id)
            .then((status) => {
                if (status && tweet.featuredImage) {
                    appwriteService.deleteImage(tweet.featuredImage);
                }
                navigate('/')
            })
    }

    return loading ? <h1>Loading...</h1>
        : tweet ? (
            <Container className='mt-[4rem]'>
                <div className='bg-blue-700'>
                    {tweet.featuredImage &&
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            height='470px'
                            width='670px'
                        />
                    }
                    <div>
                        <h3>{tweet.content}</h3>
                    </div>
                    <div>
                        <p>{tweet.timestamp}</p>
                    </div>
                    <LikeBtn tweet={tweet} />
                    {
                        isAuthor ? (
                            <Button
                                className='text-xs'
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        ) : null
                    }
                </div>
            </Container>
        ) : <h1>Tweet unavalibale</h1>
}

export default Tweet
