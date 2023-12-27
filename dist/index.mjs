// src/index.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
var createUser = async (user, UserSchema) => {
  const password = await bcrypt.hash(user.password, 10);
  const userData = new UserSchema({
    name: user.name,
    email: user.email,
    password
  });
  await userData.save();
  return user;
};
var loginUser = async (loginData, UserSchema) => {
  const user = await UserSchema.findOne({ email: loginData.email });
  if (!user || !await bcrypt.compare(loginData.password, user.password)) {
    throw new Error("Invalid credentials");
  }
  const payload = {
    email: user.email
  };
  const secretKey = "your_secret_key";
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};
var start = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    ``;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
export {
  createUser,
  loginUser,
  start
};
//# sourceMappingURL=index.mjs.map