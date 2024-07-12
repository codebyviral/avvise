import { User } from "../models/user-model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password.' })
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.log('login controller error', error)
    }
}

const authControllers = { signup, login }

export { authControllers }