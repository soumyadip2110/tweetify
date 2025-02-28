import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, TweetCard } from '../components';
import appwriteService from '../appwrite/config'
import { useParams } from 'react-router-dom';

function UserHome() {
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData);
    const [userTweets, setUserTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = slug ? slug : userData.$id;
    const [message, setMessage] = useState('')
    const [notFoundMessage, setNotFoundMessage] = useState('')

    useEffect(() => {
        appwriteService.getUserTweets(userId)
            .then((tweets) => {
                setUserTweets(tweets.documents.reverse())
                if (tweets?.documents.length > 0) {
                    setMessage(
                        !slug ?`Hi ${userData.name}, here are all of your posts:`
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
    }, []);

    return loading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>Loading...</h1>
        : userTweets.length > 0 ? (
            <Container className='mt-[2rem] md:mt-[1rem]'>
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