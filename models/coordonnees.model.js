module.exports = (sequelize, Sequelize) => {
    const Coordonnee = sequelize.define('coordonne', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        lat: {
            type: Sequelize.FLOAT
        },
        long: {
            type: Sequelize.FLOAT
        }
    });

    return Coordonnee;
}