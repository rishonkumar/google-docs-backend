import { User } from "../db/models/user.model"
import { compare, genSalt, hash } from "bcrypt"
import jwt from "jsonwebtoken";
import { RefreshToken } from "../db/models/refresh-token.model";
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

    public checkPassword = async (user: User, password: string): Promise<boolean> => {
        const isPasswordValid = await compare(password, user.password)
        return isPasswordValid
    }

    public getRequestUser = async (user: User | RequestUser): Promise<RequestUser> => {

        if (user instanceof User) {
            const userWithRole = await User.scope("withRole").findByPk(user.id)
            const role = userWithRole?.userRole.map((userRole) => userRole.role.name)

            return {
                id: user.id,
                email: user.email,
                roles: role
            } as RequestUser
        } else {
            return user
        }

    }

    public generateAuthResponse = async (user: RequestUser | User): Promise<TokenPair> => {

        const requestUser = await this.getRequestUser(user)

        const accessToken = jwt.sign(requestUser, "acccess_token_secret", { expiresIn: "24hrs" })
        const refreshToken = jwt.sign(requestUser, "refresh_token_secret", { expiresIn: "7d" })

        await RefreshToken.destroy({ where: { userId: requestUser.id } })

        await RefreshToken.create({
            token: refreshToken,
            userId: requestUser.id
        })

        return {
            accessToken,
            refreshToken
        }
    }

}

const userService = new UserService()

export default userService
