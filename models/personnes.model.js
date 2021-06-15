module.exports = (sequelize, Sequelize) => {
    const Personne = sequelize.define('personne', {
     id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        numtel: {
            type: Sequelize.STRING
        }
    });

    return Personne;
}