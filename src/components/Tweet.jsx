import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { Button } from '../components'

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
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = () => {
        appwriteService.deleteTweet(tweet.$id)
            .then((status) => {
                if (status) {
                    navigate('/')
                }
            })
    }

    const handleLikeUnlike = () => {
        appwriteService.likeTweet({
            tweetId: tweet.$id,
            userId: userData.$id
        })
            .then((response) => {
                console.log('liked/unliked');
            })
    }

    return loading ? <h1>Loading...</h1>
        : tweet ? (
            <div className='bg-blue-700'>
                <div>
                    <h3>{tweet.content}</h3>
                </div>
                <div>
                    <p>{tweet.timestamp}</p>
                </div>
                <Button onClick={handleLikeUnlike}>Like/Unlike</Button>
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
        ) : <h1>Tweet unavalibale</h1>
}

export default Tweet
