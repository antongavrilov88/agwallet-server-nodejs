/* eslint-disable max-classes-per-file */
import {
    Model,
    // ModelDefined,
    DataTypes,
    // HasManyGetAssociationsMixin,
    // HasManyAddAssociationMixin,
    // HasManyHasAssociationMixin,
    // Association,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    Optional
} from 'sequelize'
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

interface UserAttributes {
    id: number
    email: string
    password: string
    admin: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number
    public email!: string
    public password!: string
    public admin!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        password: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        sequelize
    }
)
