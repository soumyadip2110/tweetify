import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { TweetCard, Container } from '../components/index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const authStatus = useSelector(state => state.auth.status);
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus) {
            appwriteService.getTweets()
                .then((tweets) => {
                    setTweets(tweets.documents);
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    }, []);

    if (authStatus) {
        return loading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>Loading...</h1>
            : tweets?.length > 0 ? (
                <Container className='mt-[2rem] md:mt-[1rem]'>
                    {
                        tweets.map((tweet) => (
                            <div key={tweet.$id}>
                                <TweetCard {...tweet} />
                            </div>
                        ))
                    }
                </Container>
            )
                : <h2 className='text-white'> No tweets available </h2>
    }
    return (
        <Container className='mt-[6rem] p-12 overflow-hidden'>
            <h1 className='text-5xl text-white'>Welcome to Tweet App</h1>
            <div className='text-lg mt-12'>
                <h2>
                    Please <span className='font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:cursor-pointer' onClick={() => navigate('/login')}>Login</span> if you already have an account!
                </h2>
                <h2 className='text-md mt-2'>
                    Don't have an account? <span className='font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:cursor-pointer' onClick={() => navigate('/signup')}>Sign-Up</span>
                </h2>
            </div>
        </Container>
    )
}

export default Home
