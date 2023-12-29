import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Model } from "mongoose";
import { UserModel } from "./model/user.shema";

interface User {
  name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}
// interface UserModel {
//   new(data: User): any;
//   save(): Promise<any>;
// }

export const start = async (MONGODB_URI: string) => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    ``;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
// when doing dependency injection gettin timeout error . 
export const createUser = async (user: User) => {
  try {
    // Hash password
    const password = await bcrypt.hash(user.password, 10);

    // Check for existing user with the same email
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      // Handle existing user (e.g., throw an error or return a message)
      throw new Error('User with that email already exists');
    } else {
      // Create the new user
      const userData = new UserModel({
        name: user.name,
        email: user.email,
        password: password,
      });
      const newUser = await userData.save();

      console.log("Successfully added user");
      return newUser;
    }
  } catch (error) {
    // Handle errors gracefully
    console.error("Error creating user:", error);
    throw new Error(`Failed to create user: ${error}`);
  }
};

//create user module for login
export const loginUser = async (
  loginData: LoginData,
  // UserSchema: Model<User>
) => {
  // Fetch user from database
  const user = await UserModel.findOne({ email: loginData.email });

  // Compare passwords
  if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const payload = {
    email: user.email,
  };

  const secretKey = "your_secret_key"; // Replace with your actual secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Set token expiration

  return token;
};
