import { Model } from 'mongoose';

interface User {
    name: string;
    email: string;
    password: string;
}
interface LoginData {
    email: string;
    password: string;
}
declare const createUser: (user: User, UserSchema: Model<User>) => Promise<User>;
declare const loginUser: (loginData: LoginData, UserSchema: Model<User>) => Promise<string>;
declare const start: (MONGODB_URI: string) => Promise<void>;

export { createUser, loginUser, start };
