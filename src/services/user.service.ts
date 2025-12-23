import { User } from "../db/models/user.model"
import {genSalt} from "bcrypt"
import {hash} from "node:crypto";
import jwt from "jsonwebtoken";
class UserService {
    public findUserByEmail = async (email: string): Promise<User | null> => {
        const user = await User.findOne({ where: { email } })
        return user
    }

    public createUser = async(email: string, password: string): Promise<User> => {
        const salt = await genSalt()
        const hashedPassword = await hash(password,salt)
        const verificationToken =jwt.sign({email},"verify_secret")
        const user = await User.create({
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken
        })
        return user
    }
}

const userService = new UserService()

export default userService
