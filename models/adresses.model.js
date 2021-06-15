module.exports = (sequelize, Sequelize) => {
    const Adresse = sequelize.define('adresse', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        numero: {
            type: Sequelize.STRING
        },
        rue: {
            type: Sequelize.STRING
        },
        codepostal: {
            type: Sequelize.STRING
        },
        ville: {
            type: Sequelize.STRING
        }
    });

    return Adresse;
}