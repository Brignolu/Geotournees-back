module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define('utilisateur', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nom: {
            type: Sequelize.STRING
        },
        nom_utilisateur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mot_de_passe: {
            type: Sequelize.STRING,
            allowNull: false,
        }


    });

    return Utilisateur;
}