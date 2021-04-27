import {userRoutes} from './routes/user.routes'

const express = require('express')
const bodyParser = require('body-parser')

export const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

userRoutes(app)
