import {Sequelize, SequelizeOptions} from 'sequelize-typescript'

const sequelizeOptions: SequelizeOptions = {
    host: 'agwallet-postgres',
    port: 5432,
    username: 'agwallet',
    password: 'password',
    database: 'agwalletdb',

    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export const sequelize: any = new Sequelize(sequelizeOptions)
