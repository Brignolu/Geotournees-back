module.exports = (sequelize, Sequelize) => {
    const Abonne = sequelize.define('abonne', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        numero_abo: {
            type: Sequelize.STRING
        },
        transmetteur: {
            type: Sequelize.INTEGER
        },
        identifiant_wbb: {
            type: Sequelize.INTEGER
        }

    });

    return Abonne;
}