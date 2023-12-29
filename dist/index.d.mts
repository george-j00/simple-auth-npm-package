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
// interface UserModel extends Model<User> {
//     new(data: User): any;
//   }
// declare const createUser: (user: User, UserModel: UserModel) => Promise<User>;
declare const createUser: (user: User) => Promise<User>;
declare const loginUser: (loginData: LoginData) => Promise<string>;
declare const start: (MONGODB_URI: string) => Promise<void>;

export { createUser, loginUser, start };
