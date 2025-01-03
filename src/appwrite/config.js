import { Client, Databases, ID } from "appwrite";
import conf from '../conf/conf'

export class Service{
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createTweet({content, userId, timestamp}){
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

    async likePost({id, likeCount}){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    likes: likeCount + 1
                }
            );
        } catch (error) {
            console.log('Appwrite service :: likePost :: error', error);
        }
    }

    async getLikes(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                [
                    Query.select(['likes'])
                ]
            );
        } catch (error) {
            console.log('Appwrite service :: getLikes :: error', error);
        }
    }

    async getTweet(slug){
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

    async getTweets(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
            );
        } catch (error) {
            console.log('Appwrite service :: getTweets :: error', error);
        }
    }

    async deleteTweet(id){
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