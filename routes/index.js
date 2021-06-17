var express = require('express');
var router = express.Router();
var db = require('../config/db.config.js')

/*
const jwt = require("jsonwebtoken");
expressjwt = require("express-jwt");
const jwtCheck = expressjwt({
    secret: "mykey",
    algorithms:["HS256"]
});
*/

// Chargement des modèles
const Abonnes = db.abonnes
const Adresses = db.adresses
const Agents = db.agents
const Coordonnees = db.coordonnes
const Status = db.status
const Etats = db.etats
const Motifs = db.motifs
const Personnes = db.personnes
const Interventions = db.interventions
const TypesInter = db.typesinter
const Utilisateurs = db.utilisateurs


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * @swagger
 * /coordonnes:
 *   get:
 *     summary: Renvoie les coordonnées.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                   properties:
 *                 lat:
 *                   type: float
 *                 lon:
 *                   type: float
 *                 personneId:
 *                   type: int
 */


router.get('/coordonnees', function (req, res, next) {
    var coordonnes = Coordonnees.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return coordonnes;
});

/**
 * @swagger
 * /create/coordonnees:
 *   post:
 *     summary: Renvoie les coordonnées.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                   properties:
 *                 lat:
 *                   type: float
 *                 lon:
 *                   type: float
 *                 personneId:
 *                   type: int
 */

router.post('/create/coordonnees', function (req, res, next) {
    console.log(req.body.abonnes);
    Coordonnees.create({
        lat: req.body.lat,
        long: req.body.lon,
        adresseId: req.body.adresseId
    }).then(coordonnee => {
        console.log(coordonnee.get({
            plain: true
        }));
        res.send(coordonnee);
    });
});

/**
 * @swagger
 * /abonnes:
 *   get:
 *     summary: Renvoie les abonnés.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                   properties:
 *                 numero_abo:
 *                   type: float
 *                 transmetteur:
 *                   type: float
 *                 identifiant_wbb:
 *                   type: float
 *                 personneId:
 *                   type: int
 */

router.get('/abonnes', function (req, res, next) {
    var abonnes = Abonnes.findAll({
        include: Personnes,
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return abonnes;
});

/**
 * @swagger
 * /create/abonne:
 *   post:
 *     summary: Crée les abonnes.
 *     responses:
 *       200:
 *         description: Created
 */

router.post('/create/abonne', function (req, res, next) {
    console.log(req.body.abonnes);
    Abonnes.create({
        numero_abo: req.body.numero_abo,
        transmetteur: req.body.transmetteur,
        identifiant_wbb: req.body.identifiant_wbb
    }).then(abonnes => {
        console.log(abonnes.get({
            plain: true
        }));
        res.send(abonnes);
    });
});

/**
 * @swagger
 * /etats:
 *   get:
 *     summary: Renvoie les états.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                   properties:
 *                 etats:
 *                   type: string
 */

router.get('/etats', function (req, res, next) {
    var etats = Etats.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return etats;
});

/**
 * @swagger
 * /create/etat:
 *   post:
 *     summary: Crée un état.
 *     responses:
 *       200:
 *         description: Created
 */

router.post('/create/etat', function (req, res, next) {
    console.log(req.body.etat)
    Etats.create({
        etat: req.body.etat
    }).then(etat => {
        console.log(etat.get({
            plain: true
        }));
        res.send(etat);
    });
});

/**
 * @swagger
 * /motifs:
 *   get:
 *     summary: Retourne les motifs.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   properties:
 *                 etat:
 *                   type: string
 */

router.get('/motifs', function (req, res, next) {
    var motif = Motifs.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return motif;
});

/**
 * @swagger
 * /create/motif:
 *   post:
 *     summary: crée les motifs.
 *     responses:
 *       200:
 *         description: Created
 */

router.post('/create/motif', function (req, res, next) {
    console.log(req.body.motif)
    Motifs.create({
        motif: req.body.motif
    }).then(motif => {
        console.log(motif.get({
            plain: true
        }));
        res.send(motif);
    });
});
/**
 * @swagger
 * /types:
 *   get:
 *     summary: Retourne les types.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   properties:
 *                 etat:
 *                   type: string
 */
router.get('/types', function (req, res, next) {
    var types = TypesInter.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return types;
});
/**
 * @swagger
 * paths:
 *  /create/type:
 *      post:
 *       summary: Crée les types
 *       responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   properties:
 *                 etat:
 *                   type: string
 */
router.post('/create/type', function (req, res, next) {
    console.log(req.body.type)
    Types.create({
        type: req.body.type
    }).then(type => {
        console.log(type.get({
            plain: true
        }));
        res.send(type);
    });
});
/**
 * @swagger
 * paths:
 *  /adresses:
 *      get:
 *       summary: Retourne les adresses
 *       description: Retourne les adresses
 *       reponses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   properties:
 *                 etat:
 *                   type: string
 */
router.get('/adresses', function (req, res, next) {
    var etats = Adresses.findAll({
        include: Coordonnees,
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return etats;
});
/**
 * @swagger
 * paths:
 *  /create/adresse:
 *      post:
 *       summary: Crée une adresse
 *       description: Crée une adresse liée au coordonnées
 */
router.post('/create/adresse', function (req, res, next) {
    console.log(req.body.adresse)
    Adresses.create({
        numero: req.body.numero,
        rue: req.body.rue,
        codepostal: req.body.codepostal,
        ville: req.body.ville,
        personneId: req.body.personneId
    }).then(adresse => {
        console.log(adresse.get({
            plain: true
        }));
        res.send(adresse);
    });
});
/**
 * @swagger
 * paths:
 *  /personnes:
 *      get:
 *       summary: Retourne les personnes
 *       description: Retourne les personnes
 *       reponses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   properties:
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 num_tel:
 *                   type: string
 */
router.get('/personnes', function (req, res, next) {
    var personnes = Personnes.findAll({
        include: [{
            model: Adresses,
            include: [{
                model: Coordonnees
            }]
        }],
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return personnes;
});

/**
 * @swagger
 * paths:
 *  /create/personne:
 *      post:
 *       summary: Crée une personne
 *       description: Crée une personne
 */

router.post('/create/personne', function (req, res, next) {
    console.log(req.body.personnes)
    Personnes.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        numtel: req.body.numtel,
        abonneId: req.body.abonneId
    }).then(personne => {
        console.log(personnes.get({
            plain: true
        }));
        res.send(personne);
    });
});

/**
 * @swagger
 * paths:
 *  /interventions:
 *      get:
 *       summary: Retourne les interventions
 *       description: Retourne les interventions
 *       reponses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   properties:
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 num_tel:
 *                   type: string
 */

router.get('/interventions', function (req, res, next) {
    var interventions = Interventions.findAll({
        include: [{model: Motifs}, {model: TypesInter}, {model: Agents}, {model: Etats}, {
            model: Abonnes,
            include: {
                model: Personnes, include: {
                    model: Adresses, include: {
                        model: Coordonnees
                    }
                }
            }
        }],
        raw: true,
    }).then(result => {
        return res.send(result)
    }).catch(err => {
        console.log(err)
    });
});

/**
 * @swagger
 * paths:
 *  /create/intervention:
 *      post:
 *       summary: Crée une intervention
 *       description: Crée une intervention
 */

router.post('/create/intervention', function (req, res, next) {
    console.log(req.body.interventions)
    Interventions.create({
        date: req.body.date,
        abonneId: req.body.abonneId,
        agentId: req.body.agentId,
        typeId: req.body.typeId,
        motifId: req.body.motifId
    }).then(intervention => {
        console.log(intervention.get({
            plain: true
        }));
        res.send(intervention);
    });
});

router.post('/create/utilisateur', function (req, res) {
    if (!req.body.nom_utilisateur || !req.body.mot_de_passe) {
        res.status("400");
        return res.send("Requête non valide !");
    } else {
        let nouvelUtilisateur = {
            nom: req.body.nom,
            nom_utilisateur: req.body.nom_utilisateur,
            mot_de_passe: req.body.mot_de_passe,
            statusId: req.body.statusId
        };
        Utilisateurs.findOrCreate({
            where: {
                nom_utilisateur: req.body.nom_utilisateur
            },
            defaults: nouvelUtilisateur
        }).then((utilisateur) => {
            if (utilisateur[1]) {
                return res.send({
                    message: "Utilisateur créé"
                });
            } else {
                return res.send({message: "Utilisateur " + req.body.nom_utilisateur + " existant"});
            }
        });
    }

});

router.post('/login', function (req, res) {
    if (!req.body.nom_utilisateur || !req.body.mot_de_passe) {
        return res.send({
            ok: false,
            etat: "Identifiant ou mot de passe manquant !"
        });
    } else {
        Utilisateurs.findAll({
            where: {
                nom_utilisateur: req.body.nom_utilisateur,
                mot_de_passe: req.body.mot_de_passe,
            },
            include: Status,
        }).then((utilisateur) => {
            if (utilisateur.length > 0) {
                req.session.utilisateur = utilisateur[0];
                console.log(req.session.utilisateur);
                return res.send({
                    ok: true,
                    etat: "Bonjour" + utilisateur[0].nom_utilisateur + " !",
                    nom_utilisateur: utilisateur[0].nom_utilisateur,
                    roleId: utilisateur[0].statusId,
                    role: utilisateur[0].status.type
                });
            } else {
                return res.send({
                    ok: false,
                    etat: "Identifiant ou mot de passe incorrect"
                })
            }
        })
    }
});

router.get('/logout', estAuth, function (req, res) {
    req.session.destroy();
    res.send({
        ok: false,
        etat: "Au revoir !"});
});

function estAuth(req, res, next) {
    if (req.session.utilisateur) {
        console.log(req.session);
        next();
    } else {
        return res.send({etat: "Echec de l'authentification"});
    }
}

function estAdmin(req, res, next) {
    if (req.session.utilisateur.statusId === 3) {
        console.log(req.session);
        next();
    } else {
        return res.send({etat: "Rôle Administrateur requis"});
    }
}

function estMode(req, res, next) {
    if (req.session.utilisateur.statusId === 2) {
        console.log(req.session);
        next();
    } else {
        return res.send({etat: "Rôle Moderateur requis"});
    }
}

router.get('/auth/etats', [estAuth, estAdmin], function (req, res, next) {
    var etats = Etats.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.send(result);
    }).catch(err => console.log(err))
    return etats;
});


/*
router.post('/login', function (req, res, next) {
    // Genère un token, l'assigne à un utilisateur.
    const token = jwt.sign({
        sub: Utilisateurs.id,
        username: Utilisateurs.nom_utilisateur
    }, "mykey", { expiresIn: "3 hours" });
    res.status(200).send({ access_token: token })
});

router.get("/logged/interventions", jwtCheck, (req,res) => {
});
*/

module.exports = router;