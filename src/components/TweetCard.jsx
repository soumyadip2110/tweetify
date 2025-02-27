// import React from 'react'
// import { Link } from 'react-router-dom'
// import LikeBtn from './LikeBtn'
// import appwriteService from '../appwrite/config'

// function TweetCard(tweet) {
//     return (
//         <div className="w-full sm:w-2/3 md:w-1/2 p-1 mx-auto rounded-md shadow-lg overflow-hidden my-6 shadow-[0px_0px_2px_rgba(255,255,255,0.4)]">
//             <p
//                 className="font-semibold text-white text-sm text-left mx-1"
//             >
//                 {tweet.userName ? tweet.userName : 'Username not found!'}
//             </p>
//             <Link to={`/tweet/${tweet.$id}`}>
//                 <div className="p-4 transition rounded-md duration-300 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600">
//                     {tweet.featuredImage && (
//                         <img
//                             src={appwriteService.getImagePreview(tweet.featuredImage)}
//                             alt={tweet.content}
//                             className="w-full h-64 object-cover rounded-md mb-4"
//                         />
//                     )}
//                     <div className="space-y-2">
//                         <h3 className="text-lg font-semibold text-white">{tweet.content}</h3>
//                     </div>
//                 </div>
//             </Link>
//             <div className="flex justify-between py-1 px-2">
//                 <p className="text-sm text-gray-300">{tweet.timestamp}</p>
//                 <LikeBtn tweet={tweet} />
//             </div>
//         </div>
//     )
// }

// export default TweetCard













import React from 'react'
import { Link } from 'react-router-dom'
import LikeBtn from './LikeBtn'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function TweetCard(tweet) {
    const userData = useSelector(state => state.auth.userData)
    return (
        <div className="w-full sm:w-2/3 md:w-1/2 p-1 mx-auto rounded-md shadow-lg overflow-hidden my-6 shadow-[0px_0px_2px_rgba(255,255,255,0.4)]">
            <Link to={tweet.userName === userData.name ? '/user-tweets' : `/user/${tweet.userId}`}
                className="font-semibold text-white text-sm text-left mx-1"
            >
                {tweet.userName ? tweet.userName : 'Username not found!'}
            </Link>
            <Link to={`/tweet/${tweet.$id}`}>
                <div className="p-4 transition rounded-md duration-300 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600">
                    {tweet.featuredImage && (
                        <img
                            src={appwriteService.getImagePreview(tweet.featuredImage)}
                            alt={tweet.content}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                    )}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{tweet.content}</h3>
                    </div>
                </div>
            </Link>
            <div className="flex justify-between py-1 px-2">
                <p className="text-sm text-gray-300">{tweet.timestamp}</p>
                <LikeBtn tweet={tweet} />
            </div>
        </div>
    )
}

export default TweetCard
