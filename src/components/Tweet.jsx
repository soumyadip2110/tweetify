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
    const [likeCount, setLikeCount] = useState(0)
    const [liked, setLiked] = useState(false)
    const [updateLike, setUpdateLike] = useState(false)
    const [likeLoading, setLikeLoading] = useState(true)

    useEffect(() => {
        appwriteService.getTweet(slug)
            .then((tweet) => {
                setTweet(tweet);
                return appwriteService.getLikes(tweet.$id, true);
            })
            .then((likes) => {
                setLikeCount(likes.length)
                setLiked(likes.some(like => like.userId === userData.$id));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
                setLikeLoading(false)
            });
    }, [slug, updateLike]);

    const handleLikeUnlike = () => {
        setLikeLoading(true);
        appwriteService.likeTweet({
            tweetId: tweet.$id,
            userId: userData.$id
        })
            .then(() => setUpdateLike(prev => !prev))
            .catch(err => console.log(err));
    }

    const handleDelete = () => {
        setLoading(true)
        appwriteService.deleteTweet(tweet.$id)
            .then((status) => {
                if (status) {
                    navigate('/')
                }
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
                <Button
                    onClick={handleLikeUnlike}
                    disabled={likeLoading}
                >
                    {likeLoading ? 'Loading...' : liked ? 'Unlike' : 'Like'}
                </Button>
                <div>
                    <h3>Likes: {likeLoading ? 'Loading...' : likeCount}</h3>
                </div>
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
