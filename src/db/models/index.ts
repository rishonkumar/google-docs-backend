import { Sequelize } from "sequelize";
import sequelize from "../../config/db.config";
import { DocumentUser } from "./document-user.model";
import { Document } from "./document.model";
import { RefreshToken } from "./refresh-token.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";
import { User } from "./user.model";


sequelize.addModels([
    User,
    Role,
    UserRole,
    Document,
    DocumentUser,
    RefreshToken
])

const db = {
    Sequelize,
    sequelize,
    User,
    Role,
    UserRole,
    Document,
    DocumentUser,
    RefreshToken
}

export default db