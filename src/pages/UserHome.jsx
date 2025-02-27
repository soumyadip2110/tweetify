import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, TweetCard } from '../components';
import appwriteService from '../appwrite/config'

function UserHome() {
    const userData = useSelector(state => state.auth.userData);
    const [userTweets, setUserTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getUserTweets(userData.$id)
            .then((tweets) => {
                setUserTweets(tweets.documents.reverse())
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
                    Hi {userData.name}, here are all of your posts:
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
            : <h2 className='text-white'> No tweets available </h2>
}

export default UserHome
