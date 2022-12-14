module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        rank_points: {
            type: Sequelize.INTEGER
        }
    });
    return User;
};