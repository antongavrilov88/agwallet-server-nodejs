import {db} from './models/index'
import {userRoutes} from './routes/user.routes'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

export const app = express()

const corsOptions = {
    origin: 'https://localhost:5000'
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))

db.sequelize.sync({force: true}).then(() => {
})

app.get('/', (req: any, res: any) => {
    res.json({message: 'Welcome to sample api-server'})
    console.log(req)
})

userRoutes(app)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
