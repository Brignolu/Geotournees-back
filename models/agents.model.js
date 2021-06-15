module.exports = (sequelize, Sequelize) => {
    const Agent = sequelize.define('agent', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nom: {
            type: Sequelize.STRING
        },
    });

    return Agent;
}