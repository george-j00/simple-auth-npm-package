# simple-auth-npm-package

Simple-Auth-Connection

Description :
    
    An npm package that simplifies MongoDB connection using Mongoose, providing easy-to-use functions for user signup, login, and database setup with encryption using bcryptjs.

Installation :
    
    npm install simple-auth-connection

Usage

1.  Import the Package

        const { start, createUser, loginUser } = require('simple-auth-connection');

        // Or for ES6 modules

        import { start, createUser, loginUser } from 'simple-auth-connection';

2. Start MongoDB Connection

        // Provide MongoDB URI to start the connection
        await start('YOUR_MONGODB_URI');

3. User Signup

        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securepassword',
        };

        try {
            const newUser = await createUser(userData);
            console.log('User created:', newUser);
        } catch (error) {
            console.error('Error creating user:', error);
        }

4. User Login

        const loginData = {
            email: 'john@example.com',
            password: 'securepassword',
        };

        try {
            const token = await loginUser(loginData);
            console.log('Login successful. Token:', token);
        } catch (error) {
            console.error('Invalid credentials:', error);
        }

    JWT Token :

        Upon successful login using loginUser, a JWT token is returned.
        This token contains the email of the logged-in user as the payload.
        Use this token for subsequent authenticated requests by including it in the Authorization header.

Functions :

    start(MONGODB_URI: string): Promise<void> :- Initializes the MongoDB connection. Pass your MongoDB URI as an argument.

    createUser(userData: { name: string, email: string, password: string }): Promise<object> :- Creates a new user in the database. Provide user data including name, email, and password.

    loginUser(loginData: { email: string, password: string }): Promise<string> :- Logs in the user. Provide login data with email and password. Return jwt token . 

    
Security : 

    The package uses bcryptjs to encrypt user passwords, ensuring secure storage.

## Additional Notes
    The package automatically creates a MongoDB collection named 'users' to store user data.
    Passwords are encrypted using bcryptjs for security.

Contributing :
     
    Contributions, issues, and feature requests are welcome! Open an issue or submit a pull request.
    
    Fork the repository on GitHub.
    Create a branch for your changes.
    Commit your changes with descriptive messages.
    Push your changes to your fork.
    Submit a pull request.

License : 

    This project is licensed under the MIT License - see the LICENSE file for details.