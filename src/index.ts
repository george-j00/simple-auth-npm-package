import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import mongoose , { Model }  from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}


//create user module for signup 
export const createUser = async (user: User , UserSchema: Model<User>) => {
  // Hash password
 const password = await bcrypt.hash(user.password, 10);

  const userData = new UserSchema({
    name: user.name,
    email: user.email,
    password: password,
  });

  await userData.save();

  return user;
};
//create user module for login 
export const loginUser = async (loginData:LoginData , UserSchema: Model<User>) => {
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
//create user module for start the process on mentioned por
export const start = async ( MONGODB_URI : string) => {  

  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    ``;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};


