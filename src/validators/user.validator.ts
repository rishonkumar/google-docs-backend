import { body } from "express-validator";
import userService from "../services/user.service";

class UserValidator {
    public register = [
        body("email").isEmail().normalizeEmail().withMessage("Must provide a valid email"),
        body("email").custom(async (email) => {
            const user = await userService.findUserByEmail(email)

            if (user) {
                return Promise.reject("User already exists")
            }
            return true
        }),
        body("password1").exists().withMessage("Must provide a password"),
        body("password1").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("password1").isStrongPassword().withMessage("Password must be strong"),
        body("password2").custom((value, { req }) => {
            if (value !== req.body.password1) {
                throw new Error("Passwords do not match")
            }
            return true
        })

    ]
}

const userValidator = new UserValidator()

export { userValidator }