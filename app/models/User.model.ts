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
        try {
            const isSignUpData = (obj: unknown): obj is UserCreationAttributes => {
                const validation = new Validator(obj, signUpDataRules)
                return !validation.fails()
            }
            if (!isSignUpData(req)) {
                return errors.WRONG_API
            }
            console.log('TUUUUUUUUT')
            const newUser: User = await User.create(req)
            return newUser
        } catch (err) {
            console.log(err)
            return err
        }
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
