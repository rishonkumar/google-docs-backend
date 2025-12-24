import { User } from "../db/models/user.model"
import { genSalt, hash } from "bcrypt"
import jwt from "jsonwebtoken";
class UserService {
    public findUserByEmail = async (email: string): Promise<User | null> => {
        const user = await User.findOne({ where: { email } })
        return user
    }

    public createUser = async (email: string, password: string): Promise<User> => {
        const salt = await genSalt()
        // console.log("Salt", salt)
        const hashedPassword = await hash(password, salt)
        // console.log("Hashed Password", hashedPassword)
        const verificationToken = jwt.sign({ email }, "verify_secret")
        // console.log("Verification Token", verificationToken)
        const user = await User.create({
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken
        })
        console.log("User", user)
        return user
    }
}

const userService = new UserService()

export default userService
