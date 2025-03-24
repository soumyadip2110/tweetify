import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from '../conf/conf'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Tweets
    async createTweet({ content, userId, timestamp, featuredImage = '', userName }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    content,
                    userId,
                    timestamp,
                    likes: 0,
                    featuredImage,
                    userName
                }
            );
        } catch (error) {
            console.log('Appwrite service :: createTweet :: error', error);
        }
    }

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

    async getUserTweets(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('userId', [userId])
                ]
            );
        } catch (error) {
            console.log('Appwrite service :: getUserTweets :: error', error);
        }
    }

    async deleteTweet(tweetId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                tweetId
            );
            const likeDocs = await this.getLikes(tweetId, true)
            likeDocs.map(async (doc) => {
                await this.deleteLikes(doc)
            });
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteTweet :: error', error);
            return false;
        }
    }

    // Likes
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
                return this.unlikeTweet(tweetId, like)
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

                return await this.updateLikes(tweetId);
            }
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

        return await this.updateLikes(tweetId);
    }

    async updateLikes(tweetId) {
        const likeCount = await this.getLikes(tweetId)
        try {
            const doc = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                tweetId,
                {
                    likes: likeCount
                }
            );
            if (doc) return likeCount;
        } catch (error) {
            console.log('Appwrite service :: updateLikes :: error', error);
        }
    }

    async getLikes(tweetId, docRequired = false) {
        try {
            const likeDocs = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                [
                    Query.equal('tweetId', [tweetId])
                ]
            );
            return docRequired ? likeDocs.documents : likeDocs.documents.length;
        } catch (error) {
            console.log('Appwrite service :: getLikes :: error', error);
        }
    }

    async deleteLikes(doc) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikesCollectionId,
                doc.$id
            );
        } catch (error) {
            console.log('Appwrite service :: deleteLikes :: error', error);
        }
    }
    // file upload/delete service

    async uploadImage(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log('Appwrite service :: uploadImage :: error', error);
        }
    }

    async deleteImage(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteImage :: error', error);
            return false;
        }
    }

    getImagePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

    // Comments
    async createComment({ tweetId, userId, comment, userName, timeStamp }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    tweetId,
                    userId,
                    comment,
                    timeStamp,
                    userName
                }
            );
        } catch (error) {
            console.log('Appwrite service :: createComment :: error', error);
        }
    }

    async getTweetComments(tweetId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                [
                    Query.equal('tweetId', [tweetId])
                ]
            );
        } catch (error) {
            console.log('Appwrite service :: getTweetComments :: error', error);
        }
    }

    async deleteComment(commentId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                commentId
            );
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteComment :: error', error);
            return false;
        }
    }

    // Stories
    async createStory({ userId, userName, content, timeStamp, uploadDateTime }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteStoriesCollectionId,
                ID.unique(),
                {
                    userId,
                    userName,
                    content,
                    timeStamp,
                    uploadDateTime
                }
            );
        } catch (error) {
            console.log('Appwrite service :: createStory :: error', error);
        }
    }

    async getStories() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteStoriesCollectionId
            );
        } catch (error) {
            console.log('Appwrite service :: getStories :: error', error);
        }
    }

    async getStory(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteStoriesCollectionId,
                slug
            );
        } catch (error) {
            console.log('Appwrite service :: getStory:: error', error);
        }
    }

    async deleteStory(storyId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteStoriesCollectionId,
                storyId
            )
        } catch (error) {
            console.log('Appwrite service :: deleteStory :: error', error);
        }
    }

    // User Profile
    async uploadProfilePicture(userId, file) {
        try {
            const image = await this.bucket.createFile(
                conf.appwriteProfilePicturesBucketId,
                ID.unique(),
                file
            );
            if (image) {
                this.addProfilePicture(userId, image.$id)
                    .then(() => { return image })
            }
        } catch (error) {
            console.log('Appwrite service :: uploadProfilePicture :: error', error);
        }
    }

    async addProfilePicture(userId, profilePicture) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserProfileCollectionId,
                ID.unique(),
                {
                    userId,
                    profilePicture
                }
            );
        } catch (error) {
            console.log('Appwrite service :: addProfilePicture :: error', error);
        }
    }

    async removeProfilePicture(userId) {
        try {
            const doc = await this.getFileId(userId)
            if (doc){
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteUserProfileCollectionId,
                    doc.documents[0].$id
                );
            }
            return true;
        } catch (error) {
            console.log('Appwrite service :: removeProfilePicture :: error', error);
            return false;
        }
    }

    async deleteProfilePicture(userId) {
        try {
            const fileId = await this.getFileId(userId);
            if (fileId) {
                await this.removeProfilePicture(userId);
                await this.bucket.deleteFile(
                    conf.appwriteProfilePicturesBucketId,
                    fileId.documents[0].profilePicture
                );
            }
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteProfilePicture :: error', error);
            return false;
        }
    }

    async getFileId(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserProfileCollectionId,
                [
                    Query.equal('userId', [userId])
                ]
            )
        } catch (error) {
            console.log('Appwrite service :: getFileId :: error', error);
            return false;
        }
    }

    async getProfilePicturePreview(userId) {
        try {
            const data = await this.getFileId(userId)
            const fileId = data.documents[0]?.profilePicture
            if (fileId) {
                return this.bucket.getFilePreview(
                    conf.appwriteProfilePicturesBucketId,
                    fileId
                );
            }
        } catch (error) {
            console.log('Appwrite service :: getProfilePicturePreview :: error', error);
            return false;
        }
    }
}

const service = new Service();
export default service;