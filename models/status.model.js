module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define('status', {
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

    return Status;
}