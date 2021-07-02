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
        identifiant_soplanning: {
            type: Sequelize.STRING
        },
    });

    return Agent;
}