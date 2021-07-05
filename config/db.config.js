require('dotenv').config();// Import des variables d'env définies dans le .env

const Sequelize = require('sequelize');//ORM
const sequelize = new Sequelize({
    database: process.env.DB_FAVDB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging:false,
    dialectOptions: {
        useUTC:true,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modèles
db.abonnes = require('../models/abonnes.model.js')(sequelize, Sequelize);
db.adresses = require('../models/adresses.model.js')(sequelize, Sequelize);
db.agents = require('../models/agents.model.js')(sequelize, Sequelize);
db.typesinter = require('../models/typesinter.model.js')(sequelize, Sequelize);
db.motifs = require('../models/motifs.model.js')(sequelize, Sequelize);
db.personnes = require('../models/personnes.model.js')(sequelize, Sequelize);
db.etats = require('../models/etats.model.js')(sequelize, Sequelize);
db.coordonnes = require('../models/coordonnees.model.js')(sequelize, Sequelize);
db.interventions = require('../models/interventions.model.js')(sequelize, Sequelize);
db.utilisateurs = require('../models/utilisateurs.model')(sequelize, Sequelize);
db.status = require('../models/status.model')(sequelize, Sequelize);

/* Associations */
db.adresses.hasOne(db.coordonnes) // One to One
db.coordonnes.belongsTo(db.adresses)

db.personnes.hasMany(db.adresses) //Many to One
db.adresses.belongsTo(db.personnes)

db.abonnes.hasOne(db.personnes)
db.personnes.belongsTo(db.abonnes)

db.abonnes.hasMany(db.interventions) //Many to One
db.interventions.belongsTo(db.abonnes)

db.interventions.belongsTo(db.agents)
db.agents.hasOne(db.interventions)

db.interventions.belongsTo(db.typesinter)
db.typesinter.hasOne(db.interventions)

db.interventions.belongsTo(db.motifs)
db.motifs.hasOne(db.interventions)

db.interventions.belongsTo(db.etats)
db.etats.hasOne(db.interventions)


db.utilisateurs.belongsTo(db.status)
db.status.hasOne(db.utilisateurs)


/*
db.utilisateurs.belongsToMany(db.status, { through: 'utilisateurs_roles'})
db.status.belongsToMany(db.utilisateurs, { through:'utilisateurs_roles'})
*/

/*
db.status.belongsToMany(db.user, {
  through: "utilisateurs_status",
  foreignKey: "statusId",
  otherKey: "utilisateurId"
});

db.utilisateurs.belongsToMany(db.role, {
  through: "utilisateurs_status",
  foreignKey: "userId",
  otherKey: "utilisateurId"
});

db.STATUS = ["utilisateurs", "administrateur", "moderateur"];
*/


sequelize.sync({force: false}).then(() => {
    console.log("Base de donnée Synchronisée")
})
module.exports = db;