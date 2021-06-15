module.exports = (sequelize, Sequelize) => {
    const Motif = sequelize.define('motif', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        motif: {
            type: Sequelize.STRING
        }

    });

    return Motif;
}