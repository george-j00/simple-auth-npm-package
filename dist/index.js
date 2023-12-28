"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.start = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
//create user module for start the process on mentioned por
const start = (MONGODB_URI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        ``;
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
});
exports.start = start;
const createUser = (user, UserSchema) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash password
        const password = yield bcryptjs_1.default.hash(user.password, 10);
        // Create new user document
        const userData = new UserSchema({
            name: user.name,
            email: user.email,
            password: password,
        });
        // console.log(userData);
        // Save user to database (using either save() or create())
        const newUser = yield userData.save();
        return newUser;
    }
    catch (error) {
        // Handle errors gracefully
        console.error('Error creating user:', error);
        throw new Error(`Failed to create user: ${error}`);
    }
});
exports.createUser = createUser;
//create user module for login
const loginUser = (loginData, UserSchema) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch user from database
    const user = yield UserSchema.findOne({ email: loginData.email });
    // Compare passwords
    if (!user || !(yield bcryptjs_1.default.compare(loginData.password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const payload = {
        email: user.email,
    };
    const secretKey = "your_secret_key"; // Replace with your actual secret key
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" }); // Set token expiration
    return token;
});
exports.loginUser = loginUser;
