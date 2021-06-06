/* eslint-disable max-classes-per-file */
import {
    Model,
    DataTypes,
    Optional
} from 'sequelize'
import Validator from 'validatorjs'
import {signInDataRules} from './requestDataRules'
import {sequelize} from '../config/db.config'
import {createBadRequestResponse, createUserConflictResponse} from '../controllers/responseHelpers'

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

    public static add = async (rawUserData: any) => {
        const validation = new Validator(rawUserData, signInDataRules)

        if (validation.fails()) {
            return createBadRequestResponse()
        }

        const isEmailUsed = await User.findOne({
            where: {email: rawUserData.body.data.attributes.email}
        })

        if (isEmailUsed !== null) {
            return createUserConflictResponse()
        }

        const hashPassword = bcrypt.hashSync(rawUserData.body.data.attributes.password, 10)

        const users = await User.count()

        const newUserData = {
            email: rawUserData.body.data.attributes.email,
            password: hashPassword,
            admin: users === 0
        }

        const newUser = User.create(newUserData)

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
