import { Model, Document } from 'mongoose';

interface User extends Document {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}   

type CreateUserFn = (user: User, UserSchema: Model<User>) => Promise<User>;
type LoginUserFn = (loginData: LoginData, UserSchema: Model<User>) => Promise<string>;
type StartFn = (MONGODB_URI: string) => Promise<void>;

declare module 'simple-auth' {
    export const createUser: CreateUserFn;
    export const loginUser: LoginUserFn;
    export const start: StartFn;
}
