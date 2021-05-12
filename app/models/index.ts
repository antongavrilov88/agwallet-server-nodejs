/* eslint-disable @typescript-eslint/no-shadow */
import {sequelize} from '../config/db.config'

const Sequelize = require('sequelize')

export const tokenModel = (sequelize: any, Sequelize: any) => {
    const Token = sequelize.define('tokens', {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return Token
}

export const userModel = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define('users', {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })

    return User
}

export const db:any = {}

db.sequelize = sequelize

db.users = userModel(sequelize, Sequelize)
db.tokens = tokenModel(sequelize, Sequelize)
