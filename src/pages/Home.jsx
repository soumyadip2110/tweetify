import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { TweetCard, Container, StoryCard } from '../components/index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const authStatus = useSelector(state => state.auth.status);
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);

    // Tweets
    useEffect(() => {
        if (authStatus) {
            appwriteService.getTweets()
                .then((tweets) => {
                    setTweets(tweets.documents.reverse());
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    }, []);

    // Stories
    useEffect(() => {
        if (authStatus) {
            const currentDateTime = new Date(); // Creates a Date object in the local time zone, but internally uses UTC
            const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            const expiredStories = [];
            const activeStories = [];

            appwriteService.getStories()
                .then(stories => {
                    if (stories) {
                        const allStories = stories.documents;
                        allStories.forEach((story) => {
                            const storyUploadDateTime = new Date(story.timeStamp); // Converts the ISO timestamp to a Date object in UTC
                            const timeDifference = currentDateTime - storyUploadDateTime; // Both are now in milliseconds, so comparison is accurate

                            if (timeDifference >= twentyFourHoursInMilliseconds) { // Compares the difference in milliseconds
                                expiredStories.push(story);
                            } else {
                                activeStories.push(story);
                            }
                        });
                        setStories(activeStories);
                        deleteExpiredStories(expiredStories);
                    }
                })
                .catch(e => console.log(e));
        }
    }, []);

    const deleteExpiredStories = (expiredStories) => {
        expiredStories.map(story => {
            appwriteService.deleteStory(story.$id)
                .then(console.log('story deleted'))
                .catch(e => console.log(e));
        })
    }

    if (authStatus) {
        return loading ? <h1 className='text-white mt-[2rem] md:mt-[1rem]'>Loading...</h1>
            : tweets?.length > 0 ? (
                <Container className='mt-[2rem] md:mt-[1rem]'>
                    {stories.length > 0 &&
                        (
                            <div className="border-b border-gray-700 flex justify-start items-center space-x-2 overflow-x-auto mx-4 pb-4 scrollbar-hide">
                                <h1 className="font-bold text-lg mx-2">Stories:</h1>
                                <div className="flex space-x-4">
                                    {stories.map((story) => (
                                        <div key={story.$id}>
                                            <StoryCard {...story} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    <h1 className='font-bold m-2 text-lg'>Tweets:</h1>
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
            <h1 className='text-5xl text-white font-bold'>Welcome to <span className='bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent'>Tweetify</span></h1>
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
