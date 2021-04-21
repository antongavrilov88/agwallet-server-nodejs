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
