import { mongoose } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    avatar: {
        type: String,
        default: '',
    }
})

// is passowrd is not modified save document to databse
userSchema.pre('save', async function (next) {
    console.log('pre method', this);
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
})

// json web token

userSchema.methods.generateAuthToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d"
            }
        )
    } catch (error) {
        console.log(error)
    }
}


export const User = new mongoose.model('User', userSchema)