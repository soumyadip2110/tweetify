import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { TweetCard, Container } from '../components/index';

function Home() {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        appwriteService.getTweets()
            .then((tweets) => {
                setTweets(tweets)
            }).catch(e => console.log(e));
    }, []);
    
    return tweets?.length > 0 ? (
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
    : 
    <>
        {console.log(tweets)} 
        <h2> No tweets available </h2>
    </>
}

export default Home
