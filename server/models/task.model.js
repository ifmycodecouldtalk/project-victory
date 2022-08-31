const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("Task", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.DATE
        },
        duration: {
            type: Sequelize.INTEGER
        }
    });
    return Task;
};