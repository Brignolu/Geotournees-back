module.exports = (sequelize, Sequelize) => {
    const TypeInter = sequelize.define('type', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        }

    });

    return TypeInter;
}