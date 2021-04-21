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
