import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";
import mongoose, { Model } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}

//create user module for start the process on mentioned por
export const start = async (MONGODB_URI: string) => {
  try {
    await mongoose.connect(MONGODB_URI as string );
    console.log("Connected to MongoDB");
  } catch (error) {
    ``;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const createUser = async (user: User, UserSchema: Model<User>) => {
  try {
    // Hash password
    const password = await bcrypt.hash(user.password, 10);

    // Create new user document
    const userData = new UserSchema({
      name: user.name,
      email: user.email,
      password: password,
    });

    // console.log(userData);
    // Save user to database (using either save() or create())
   const newUser =  await userData.save()

    return newUser;

  } catch (error) {
    // Handle errors gracefully
    console.error('Error creating user:', error);
    throw new Error(`Failed to create user: ${error}`);
  }
};

//create user module for login
export const loginUser = async (
  loginData: LoginData,
  UserSchema: Model<User>
) => {
  // Fetch user from database
  const user = await UserSchema.findOne({ email: loginData.email });

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

