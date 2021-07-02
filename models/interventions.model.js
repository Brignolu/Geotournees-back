module.exports = (sequelize, Sequelize) => {
    const Intervention = sequelize.define('intervention', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE(6)
        },
        commentaires:{
            allowNull: true,
            type: Sequelize.STRING
        },
        /*
        immatriculation:{
            allowNull: true,
            type: Sequelize.STRING
        },*/
    });

    return Intervention;
}