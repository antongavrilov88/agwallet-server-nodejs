import {
    Model,
    DataTypes,
    Optional
} from 'sequelize'
import {suid} from 'rand-token'
import {createUserAlreadyInSystem, ErrorData} from '../controllers/responseHelpers'
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

    public static async add(userId: number): Promise<Token | ErrorData> {
        const isUserAlreadyInSystem: number = await Token.count({
            where: {userId}
        })

        if (isUserAlreadyInSystem !== 0) {
            return createUserAlreadyInSystem()
        }

        const tokenObj: TokenCreationAttributes = {
            userId,
            token: suid(16)
        }
        const newToken: Token = await Token.create(tokenObj)
        return newToken
    }

    public static async remove(userId: number): Promise<number | ErrorData> {
        const tokenRemoved: number = await Token.destroy({where: {userId}})

        return tokenRemoved
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
