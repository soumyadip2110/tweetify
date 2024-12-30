import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount){
                this.login({email, password})
            } else{
                return userAccount;
            }
        } catch (error) {
            console.log('Appwrite service :: createAccount :: error', error);
        }
    }

    async login({email, password}){
        try {
            return await account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log('Wrong Email or Password');
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log('Appwrite service :: logout :: error', error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log('USER NOT FOUND');
        }
    }
}

const authService = new AuthService();

export default authService;
