import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { TweetCard, Container } from '../components/index';
import { useSelector } from 'react-redux';

function Home() {
    const authStatus = useSelector(state => state.auth.status);
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)

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
        return loading ? <h1>Loading...</h1>
            : tweets?.length > 0 ? (
                <Container>
                    {
                        tweets.map((tweet) => (
                            <div key={tweet.$id}>
                                <TweetCard {...tweet} />
                            </div>
                        ))
                    }
                </Container>
            )
                : <h2> No tweets available </h2>
    }
    return <h1>Please Login to your account</h1>
}

export default Home
