import {app} from './app'
import {db} from './models/index'
import {router} from './routes/index.routes'

db.sequelize.sync().then(() => {
})

router(app)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {})
