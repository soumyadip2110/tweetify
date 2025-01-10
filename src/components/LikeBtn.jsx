import React, { useEffect, useState } from 'react'
import { Button } from './index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function LikeBtn({ tweet }) {
    const [likeCount, setLikeCount] = useState(0)
    const [liked, setLiked] = useState(false)
    const [updateLike, setUpdateLike] = useState(false)
    const [likeLoading, setLikeLoading] = useState(true)
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        appwriteService.getLikes(tweet.$id, true)
            .then((likes) => {
                setLikeCount(likes.length)
                setLiked(likes.some(like => like.userId === userData.$id));
            })
            .finally(() => {
                setLikeLoading(false)
            });
    }, [updateLike])

    const handleLikeUnlike = () => {
        setLikeLoading(true);
        appwriteService.likeTweet({
            tweetId: tweet.$id,
            userId: userData.$id
        })
            .then(() => setUpdateLike(prev => !prev))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Button
                onClick={handleLikeUnlike}
                disabled={likeLoading}
            >
                {likeLoading ? 'Loading...' : liked ? 'Unlike' : 'Like'}
            </Button>
            <div>
                <h3>Likes: {likeLoading ? 'Loading...' : likeCount}</h3>
            </div>
        </div>
    )
}

export default LikeBtn
