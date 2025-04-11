const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteLikesCollectionId: String(import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID),
    appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    appwriteStoriesCollectionId: String(import.meta.env.VITE_APPWRITE_STORIES_COLLECTION_ID),
    appwriteUserProfileCollectionId: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    // appwriteProfilePicturesBucketId: String(import.meta.env.VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID)
}

export default conf;