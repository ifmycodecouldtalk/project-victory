module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("Task", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Task;
};