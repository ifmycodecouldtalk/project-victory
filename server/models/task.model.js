module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        }
    });
    return Task;
};