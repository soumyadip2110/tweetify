import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { TweetCard, Container } from '../components/index';

function Home() {
    const [tweets, setTweets] = useState(null)

    useEffect(() => {
        appwriteService.getTweets()
            .then((tweets) => {
                setTweets(tweets)
            });
    }, []);

    return tweets ? (
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

export default Home
