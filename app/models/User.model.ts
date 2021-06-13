/* eslint-disable max-classes-per-file */
import {
    Model,
    DataTypes,
    Optional
} from 'sequelize'
import Validator from 'validatorjs'
import {signUpDataRules} from './requestDataRules'
import {sequelize} from '../config/db.config'
import {Error, errors} from '../controllers/responseHelpers'
import {SignUpData} from './types'

const bcrypt = require('bcrypt')

export interface UserAttributes {
    id: number
    email: string
    password: string
    admin: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number
    public email!: string
    public password!: string
    public admin!: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    public static async add(req: unknown): Promise<User | Error> {
        const isSignUpData = (obj: unknown): obj is SignUpData => {
            const validation = new Validator(obj, signUpDataRules)
            return !validation.fails()
        }
        if (!isSignUpData(req)) {
            return errors.WRONG_API
        }

        const countUsers: number = await User.count()

        const hashPassword: string = bcrypt.hashSync(req.body.data.attributes.password, 10)

        const userCreationObject: UserCreationAttributes = {
            email: req.body.data.attributes.email,
            password: hashPassword,
            admin: countUsers === 0
        }

        const newUser: User = await User.create(userCreationObject)
        return newUser
    }
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
