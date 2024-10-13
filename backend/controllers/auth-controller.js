import { User } from "../models/user-model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios';
const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ msg: 'Email Already Exists' })
        }
        if (!fullName || !password || !email) {
            return res.status(422).json({ error: "All fields are required" });
        }
        // Password Encryption or hashing...

        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password, saltRound)

        const userCreated = await User.create({ fullName, email, password: hash_password })

        res.status(200).json({
            message: 'Signup Successful',
            token: await userCreated.generateAuthToken(),
            userId: userCreated._id.toString(),
        })
    } catch (error) {
        console.log(`Registration controller error. ${error}`);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (!userExists) {
            // Never let anyone know what is wrong where. eg. hackers
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }
        const user = await userExists.comparePassword(password)

        if (user) {
            res.status(200).json({
                message: 'Login successful',
                token: await userExists.generateAuthToken(),
                userId: await userExists._id.toString(),
                isAdmin: await userExists.isAdmin,
                imageUrl: await userExists.avatar,
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password.' })
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.log('login controller error', error)
    }
}

const loginWithGoogle = async (req, res) => {
    try {
        const { access_token } = req.body;

        if (!access_token) {
            return res.status(400).json({ message: 'Access token is missing' });
        }

        // Verify the token with Google
        const googleResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
        );

        const { email, given_name, family_name, id, picture, verified_email } = googleResponse.data;
        console.log("googleResponse", googleResponse.data); // Log response data

        if (!verified_email) {
            return res.status(400).json({ message: 'Email not verified' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        let userCreated; // Declare the userCreated variable

        if (!user) {
            // Create new user if not exists
            userCreated = new User({
                firstName: given_name,
                lastName: family_name,
                email: email,
                avatar: picture,
                isVerified: verified_email,
            });

            // Save the new user
            await userCreated.save();
            console.log("New user created:", userCreated); // Log the newly created user
        } else {
            userCreated = user; // Assign the existing user to userCreated
            console.log("Existing user found:", userCreated); // Log the existing user
        }

        // Debug log userCreated
        console.log("User Created/Found:", userCreated);

        // Generate JWT token
        const token = await userCreated.generateAuthToken();
        const userId = userCreated._id.toString()
        // Return user info and token
        return res.status(200).json({
            token, userId,
            user: {
                token: await userCreated.generateAuthToken(),
                userId: userCreated._id.toString(), // Make sure _id exists
                email: userCreated.email,
                firstName: userCreated.firstName,
                lastName: userCreated.lastName,
                profilePicture: userCreated.avatar, // Ensure correct property
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};



const authControllers = { signup, login, loginWithGoogle }

export { authControllers }