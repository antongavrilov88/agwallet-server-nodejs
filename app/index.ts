import {app} from './app'
import { db } from './models/index'

db.sequelize.sync({force: true}).then(() => {
})

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
