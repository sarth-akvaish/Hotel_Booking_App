import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserType } from '../shared/types'


const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
})

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password as string, 8)
    }
    next();
})

const User = mongoose.model<UserType>("User", userSchema)

export default User;