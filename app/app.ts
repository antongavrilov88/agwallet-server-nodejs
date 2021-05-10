const express = require('express')
const bodyParser = require('body-parser')

export const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (_req: any, res: any) => {
    res.json({message: 'Welcome to sample api-server'})
})
