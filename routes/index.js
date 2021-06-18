var express = require('express');
var router = express.Router();
var db = require('../config/db.config.js')

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
 * /coordonnees:
 *   get:
 *     summary: Renvoie toutes les coordonnées.
 *     responses:
 *       200:
 *         description: Réponse Valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 lat:
 *                   type: number
 *                   format: float
 *                 lon:
 *                   type: number
 *                   format: float
 *                 personneId:
 *                   type: integer
 *
 */
router.get('/coordonnees', function (req, res, next) {
    var coordonnes = Coordonnees.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return coordonnes;
});

/**
 * @swagger
 * /create/coordonnees:
 *   post:
 *     summary: Crée un couple de coordonnées.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 format: float
 *               longitude:
 *                 type: number
 *                 format: float
 *               personneId:
 *                 type: integer
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Réponse Valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 latitude:
 *                   type: number
 *                   format: float
 *                 longitude:
 *                   type: number
 *                   format: float
 *                 personneId:
 *                   type: integer
 */
router.post('/create/coordonnees', function (req, res, next) {
    // Vérifie si l'objet est vide en verifiant si il ne contient aucune clé et en verifiant si le constructeur est bien un objet
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(401).send("Requête Invalide")
    } else {
        Coordonnees.create(
            {
                lat: req.body.latitude,
                long: req.body.longitude,
                adresseId: req.body.adresseId
            }
        ).then(coordonnee => {
            res.status(201).send(coordonnee);
        }).catch(err => console.log(err));
    }
});

/**
 * @swagger
 * /abonnes:
 *   get:
 *     summary: Renvoie tous les abonnés.
 *     responses:
 *       200:
 *         description: Réponse Valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                   properties:
 *                 numero_abo:
 *                   type: number
 *                   format: float
 *                 transmetteur:
 *                   type: number
 *                   format: float
 *                 identifiant_wbb:
 *                   type: number
 *                   format: float
 *                 personneId:
 *                   type: integer
 */
router.get('/abonnes', function (req, res, next) {
    var abonnes = Abonnes.findAll(
        {
            include: Personnes,
            raw: true,
            id: req.params.id,
        }
    ).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return abonnes;
});

/**
 * @swagger
 * /create/abonne:
 *   post:
 *     summary: Crée un abonné.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_abo:
 *                 type: number
 *                 format: float
 *               transmetteur:
 *                 type: number
 *                 format: float
 *               identifiant_wbb:
 *                 type: integer
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Crée
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               numero_abo:
 *                 type: number
 *                 format: float
 *               transmetteur:
 *                 type: number
 *                 format: float
 *               identifiant_wbb:
 *                 type: integer
 */

router.post('/create/abonne', function (req, res, next) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(401).send("Requête Invalide")
    } else {
        Abonnes.create({
            numero_abo: req.body.numero_abo,
            transmetteur: req.body.transmetteur,
            identifiant_wbb: req.body.identifiant_wbb
        }).then(abonnes => {
            res.status(201).send(abonnes);
        });
    }
});

/**
 * @swagger
 * /etats:
 *   get:
 *     summary: Renvoie les états.
 *     responses:
 *       200:
 *         description: Réponse Valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: object
 *                 etats:
 *                   type: string
 */
router.get('/etats', function (req, res, next) {
    var etats = Etats.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return etats;
});

/**
 * @swagger
 * /create/etat:
 *   post:
 *     summary: Crée un etat.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              etat:
 *                 type: number
 *                 format: float
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               etat:
 *                 type: string
 */
router.post('/create/etat', function (req, res, next) {
    Etats.create({
        etat: req.body.etat
    }).then(etat => {
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
 *         description: Réponse Valide
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
        return res.status(200).send(result);
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
 *         description: Créé
 */
router.post('/create/motif', function (req, res, next) {
    Motifs.create({
        motif: req.body.motif
    }).then(motif => {
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
 *         description: Créé
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
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return types;
});

/**
 * @swagger
 * /create/type:
 *   post:
 *     summary: Crée un type.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              type:
 *                 type: number
 *                 format: float
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               etat:
 *                 type: string
 */
router.post('/create/type', function (req, res, next) {
    console.log(req.body.type)
    Types.create({
        type: req.body.type
    }).then(type => {
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
 *         description: Créé
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
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return etats;
});

/**
 * @swagger
 * /create/adresse:
 *   post:
 *     summary: Crée une adresse.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: string
 *               rue:
 *                 type: string
 *               codepostal:
 *                 type: string
 *               ville:
 *                 type: string
 *               personneId:
 *                 type: integer
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               numero:
 *                 type: string
 *               rue:
 *                 type: string
 *               codepostal:
 *                 type: string
 *               ville:
 *                 type: string
 *               personneId:
 *                 type: integer
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
        res.status(201).send(adresse);
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
 *         description: Réponse Valide
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
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return personnes;
});

/**
 * @swagger
 * /create/personne:
 *   post:
 *     summary: Crée une personne.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               numtel:
 *                 type: string
 *               abonneId:
 *                 type: integer
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               numtel:
 *                 type: string
 *               abonneId:
 *                 type: integer
 */
router.post('/create/personne', function (req, res, next) {
    console.log(req.body.personnes)
    Personnes.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        numtel: req.body.numtel,
        abonneId: req.body.abonneId
    }).then(personne => {
        res.status(200).send(personne);
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
 *         description: Réponse Valide
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
        return res.status(200).send(result)
    }).catch(err => {
        console.log(err)
    });
});

/**
 * @swagger
 * /create/intervention:
 *   post:
 *     summary: Crée une intervention.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               abonneId:
 *                 type: integer
 *               agentId:
 *                 type: integer
 *               TypeId:
 *                 type: integer
 *               motifId:
 *                 type: integer
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               abonneId:
 *                 type: integer
 *               agentId:
 *                 type: integer
 *               TypeId:
 *                 type: integer
 *               motifId:
 *                 type: integer
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
        res.status(200).send(intervention);
    });
});

/**
 * @swagger
 * /create/utilisateur:
 *   post:
 *     summary: Crée une utilisateur.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               nom_utilisateur:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               statusId:
 *                 type: integer
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               nom_utilisateur:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               statusId:
 *                 type: integer
 */
router.post('/create/utilisateur', function (req, res) {
    if (!req.body.nom_utilisateur || !req.body.mot_de_passe) {
        return res.status(400).send("Requête Invalide !");
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
                return res.status(201).send({
                    message: "Utilisateur Enregistré"
                });
            } else {
                return res.status(200).send({message: "Utilisateur " + req.body.nom_utilisateur + " Existant"});
            }
        });
    }

});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Crée une personne.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_utilisateur:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *     responses:
 *       401:
 *         description: Opération Interdite
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               ok:
 *                 type: boolean
 *               etat:
 *                 type: string
 *               nom_utilisateur:
 *                 type: string
 *               roleId:
 *                 type: integer
 *               role:
 *                 type: string
 */
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
                    etat: "Identifiant ou mot de passe incorrect !"
                })
            }
        })
    }
});

router.get('/logout', estAuth, function (req, res) {
    req.session.destroy();
    res.send({
        ok: false,
        etat: "Au revoir !"
    });
});

function estAuth(req, res, next) {
    if (req.session.utilisateur) {
        console.log(req.session);
        next();
    } else {
        return res.status(400).send({etat: "Echec de l'authentification"});
    }
}

function estAdmin(req, res, next) {
    if (req.session.utilisateur.statusId === 3) {
        console.log(req.session);
        next();
    } else {
        return res.status(403).send({etat: "Rôle Administrateur requis"});
    }
}

function estMode(req, res, next) {
    if (req.session.utilisateur.statusId === 2) {
        console.log(req.session);
        next();
    } else {
        return res.status(403).send({etat: "Rôle Moderateur requis"});
    }
}

router.get('/auth/etats', [estAuth, estAdmin], function (req, res, next) {
    var etats = Etats.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return etats;
});

module.exports = router;