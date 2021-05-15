import {app} from './app'
import {sequelize} from './config/db.config'
import {router} from './routes/index'

sequelize.sync().then(() => {
})

router(app)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {})
