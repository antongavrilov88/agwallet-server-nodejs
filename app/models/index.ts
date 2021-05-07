import {sequelize} from '../config/db.config'
import {tokenModel} from './token.model'
import {userModel} from './user.model'

const Sequelize = require('sequelize')

export const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = userModel(sequelize, Sequelize)
db.tokens = tokenModel(sequelize, Sequelize)
