import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: "refresh_token", underscored: true })
class RefreshToken extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    token!: string

    @ForeignKey(() => User)
    userId!: number

    @BelongsTo(() => User)
    user!: User

}

export { RefreshToken }
