import { Client, Databases, ID, Query } from "appwrite";
import conf from '../conf/conf'

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createTweet({ content, userId, timestamp }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    content,
                    userId,
                    timestamp,
                    likes: 0
                }
            );
        } catch (error) {
            console.log('Appwrite service :: createTweet :: error', error);
        }
    }

    async likeTweet({ tweetId, userId }) {
        try {
            const like = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                [
                    Query.equal('tweetId', [`${tweetId}`]),
                    Query.equal('userId', [`${userId}`])
                ]
            )

            if (like.documents.length > 0) {
                this.unlikeTweet(tweetId, like)
            } else {
                try {
                    await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteLikesCollectionId,
                        ID.unique(),
                        {
                            tweetId,
                            userId
                        }
                    );
                } catch (error) {
                    console.log('Appwrite service :: likeTweet :: createDocument :: error', error);
                }

                const prevLikes = await this.getLikes(tweetId)

                try {
                    if (prevLikes) {
                        await this.databases.updateDocument(
                            conf.appwriteDatabaseId,
                            conf.appwriteCollectionId,
                            tweetId,
                            {
                                likes: prevLikes.documents.length
                            }
                        );
                    }
                } catch (error) {
                    console.log('Appwrite service :: likeTweet :: updateDocument :: error', error);
                }
            }
            return true;
        } catch (error) {
            console.log('Appwrite service :: likeTweet :: error', error);
            return false;
        }
    }

    async unlikeTweet(tweetId, like) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                like.documents[0].$id
            );
        } catch (error) {
            console.log('Appwrite service :: unlikeTweet :: deleteDocument :: error', error);
        }

        const prevLikes = await this.getLikes(tweetId)

        try {
            if (prevLikes) {
                await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    tweetId,
                    {
                        likes: prevLikes.documents.length < 0 ? 0 : prevLikes.documents.length
                    }
                );
            }
            return true;
        } catch (error) {
            console.log('Appwrite service :: unlikeTweet :: updateDocument :: error', error);
            return false;
        }
    }

    async getLikes(tweetId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                [
                    Query.equal('tweetId', [tweetId])
                ]
            );
        } catch (error) {
            console.log('Appwrite service :: getLikes :: error', error);
        }
    }
    // async getLikes(id) {
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             id,
    //             [
    //                 Query.select(['likes'])
    //             ]
    //         );
    //     } catch (error) {
    //         console.log('Appwrite service :: getLikes :: error', error);
    //     }
    // }

    async getTweet(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log('Appwrite service :: getTweets :: error', error);
        }
    }

    async getTweets() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
            );
        } catch (error) {
            console.log('Appwrite service :: getTweets :: error', error);
        }
    }

    async deleteTweet(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteTweet :: error', error);
            return false;
        }
    }
}

const service = new Service();
export default service;