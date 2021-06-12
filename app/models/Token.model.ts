import {
    Model,
    DataTypes,
    Optional
} from 'sequelize'
import {suid} from 'rand-token'
import {errors, Error} from '../controllers/responseHelpers'
import {sequelize} from '../config/db.config'

interface TokenAttributes {
    id: number
    token: string
    userId: number
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

export class Token extends Model<TokenAttributes, TokenCreationAttributes>
    implements TokenAttributes {
    public id!: number
    public token!: string
    public userId!: number

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    public static async add(userId: unknown): Promise<Token | Error> {
        if (typeof userId !== 'number') {
            return errors.WRONG_API
        }
        const tokenObj: TokenCreationAttributes = {
            userId,
            token: suid(16)
        }
        const newToken: Token = await Token.create(tokenObj)
        return newToken
    }
}

Token.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'tokens',
        sequelize
    }
)
