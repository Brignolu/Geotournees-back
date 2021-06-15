module.exports = (sequelize, Sequelize) => {
    const Etat = sequelize.define('etat', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        etat: {
            type: Sequelize.STRING
        }

    });

    return Etat;
}