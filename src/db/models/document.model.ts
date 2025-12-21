import { BelongsTo, Column, DataType, Default, DefaultScope, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { User } from "./user.model"
import { DocumentUser } from "./document-user.model";

@Table({ tableName: "document", underscored: true })
class Document extends Model {

    @DefaultScope(() => ({
        include: [{
            model: DocumentUser,
            include: [
                {
                    model: User,
                    attributes: ["email"]
                }
            ]
        }]
    }))

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.TEXT)
    content!: string;

    @ForeignKey(() => User)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => DocumentUser, {
        onDelete: "CASCADE"
    })
    users!: Array<DocumentUser>

    @Default(false)
    @Column(DataType.BOOLEAN)
    isPublic!: boolean
}

export { Document }