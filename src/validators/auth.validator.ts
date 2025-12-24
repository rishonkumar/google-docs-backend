import { body } from "express-validator"

class AuthValidator {

    public login = [
        body("email").isEmail().normalizeEmail().withMessage("Must provide a valid email"),
        body("password").exists().withMessage("Must provide a password")
    ]
}

const authValidator = new AuthValidator()

export default authValidator