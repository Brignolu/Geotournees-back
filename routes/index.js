var express = require('express');
var router = express.Router();
var db = require('../config/db.config.js')
var axios = require('axios')
const {Op} = require("sequelize");
var moment = require('moment')

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
moment.locale('fr-FR')


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Renvoie tous les agents.
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
 *                 nom:
 *                   type: string
 */
router.get('/agents', function (req, res, next) {
    var agents = Agents.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return agents;
});
/**
 * @swagger
 * /create/agent:
 *   post:
 *     summary: Crée un agent.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 format: float
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
 *                 nom:
 *                   type: string
 */
router.post('/create/agent', function (req, res, next) {
    // Vérifie si l'objet est vide en verifiant si il ne contient aucune clé et en verifiant si le constructeur est bien un objet
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        res.status(401).send("Requête Invalide")
    } else {
        Agents.create(
            {
                nom: req.body.nom,
            }
        ).then(agent => {
            res.status(201).send(agent);
        }).catch(err => console.log(err));
    }
});
/**
 * @swagger
 * paths:
 *  /delete/agent/:id:
 *      delete:
 *       summary: Supprime un agent
 *       description: Supprime un agent
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/agent/:id', function (req, res, next) {
    console.log(req.params.id);
    Agents.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

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
 * paths:
 *  /delete/coordonnees/:id:
 *      delete:
 *       summary: Supprime une coordonnée
 *       description: Supprime une coordonnée
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/cordonnees/:id', function (req, res, next) {
    console.log(req.params.id);
    Coordonnees.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

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
 * paths:
 *  /delete/abonne/:id:
 *      delete:
 *       summary: Supprime un abonné
 *       description: Supprime un abonné
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/abonne/:id', function (req, res, next) {
    console.log(req.params.id);
    Abonnes.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})


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
 * paths:
 *  /delete/etat/:id:
 *      delete:
 *       summary: Supprime un etat
 *       description: Supprime une etat
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/etat/:id', function (req, res, next) {
    console.log(req.params.id);
    Etats.remove({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

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
 * paths:
 *  /delete/motif/:id:
 *      delete:
 *       summary: Supprime un Motif
 *       description: Supprime un Motif
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/motif/:id', function (req, res, next) {
    console.log(req.params.id);
    Motifs.remove({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

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
 *  /delete/type/:id:
 *      delete:
 *       summary: Supprime un utilisateur
 *       description: Supprime un utilisateurs
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/type/:id', function (req, res, next) {
    console.log(req.params.id);
    TypesInter.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})


/**
 * @swagger
 * paths:
 *  /adresses:
 *      get:
 *       summary: Retourne les adresses
 *       description: Retourne les adresses
 *       responses:
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
    var adresses = Adresses.findAll({
        include: Coordonnees,
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return adresses;
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
 *  /delete/adresse:
 *      delete:
 *       summary: Supprime une Adresse
 *       description: Supprime une personne
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/adresse', function (req, res, next) {
    console.log(req.body.id);
    Adresses.remove({
        where: {
            id: req.body.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})


/**
 * @swagger
 * paths:
 *  /personnes:
 *      get:
 *       summary: Retourne les personnes
 *       description: Retourne les personnes
 *       responses:
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
        res.status(201).send(personne);
    });
});

/**
 * @swagger
 * paths:
 *  /delete/personne:
 *      delete:
 *       summary: Supprime une Personne
 *       description: Supprime une personne
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/personne', function (req, res, next) {
    console.log(req.body.id);
    Personnes.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

/**
 * @swagger
 * paths:
 *  /delete/abonne/personne/:id:
 *      delete:
 *       summary: Supprime une Personne lié à un abonné
 *       description: Supprime une personne
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/abonne/personne/:id', function (req, res, next) {
    console.log(req.params.id);
    Personnes.destroy({
        where: {
            abonneId: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})


/**
 * @swagger
 * paths:
 *  /interventions:
 *      get:
 *       summary: Retourne les interventions
 *       description: Retourne les interventions
 *       responses:
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
        motifId: req.body.motifId,
        commentaires: req.body.commentaires
    }).then(intervention => {
        res.status(200).send(intervention);
    });
});

/**
 * @swagger
 * paths:
 *  /delete/intervention:
 *      delete:
 *       summary: Supprime une intervention
 *       description: Supprime l'intervention
 *       responses:
 *       204:
 *         description: Suppression OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/delete/intervention/:id', function (req, res, next) {
    console.log(req.params.id);
    console.log("destroy");
    Interventions.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

/**
 * @swagger
 * paths:
 *  /utilisateurs:
 *      get:
 *       summary: Retourne les utilisateurs
 *       description: Retourne les utilisateurs
 *       responses:
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
 *                 nom_utilisateur:
 *                   type: string
 *                 password:
 *                   type: string
 *                 statusId:
 *                   type:integer
 */
router.get('/utilisateurs', function (req, res, next) {
    var utilisateurs = Utilisateurs.findAll({}).then(result => {
        return res.status(200).send(result)
    }).catch(err => {
        console.log(err)
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
 * paths:
 *  /delete/utilisateur/:id:
 *      delete:
 *       summary: Supprime un utilisateur
 *       description: Supprime un utilisateurs
 *       responses:
 *       204:
 *         description: Suppression Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.delete('/delete/utilisateur/:id', function (req, res, next) {
    console.log(req.params.id);
    Utilisateurs.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.status(204).send({"success": "ok"})
    })
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentifie un utilisateur.
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
            success: false,
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
                    success: true,
                    etat: "Bonjour" + utilisateur[0].nom_utilisateur + " !",
                    nom_utilisateur: utilisateur[0].nom_utilisateur,
                    roleId: utilisateur[0].statusId,
                    role: utilisateur[0].status.type
                });
            } else {
                return res.send({
                    success: false,
                    etat: "Identifiant ou mot de passe incorrect !"
                })
            }
        })
    }
});

/**
 * @swagger
 * paths:
 *  /logout:
 *      get:
 *       summary: Logout de la personne
 *       description: Supprime la Session utilisateur
 *       responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   properties:
 */
router.get('/logout', estAuth, function (req, res) {
    req.session.destroy();
    res.status(200).send({
        success: false,
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

/*
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
// Exemple de route avec permissions | Fonctionne grâce aux middlewares précédents
router.get('/auth/etats', [estAuth, estAdmin], function (req, res, next) {
    var etats = Etats.findAll({
        raw: true,
        id: req.params.id,
    }).then(result => {
        return res.status(200).send(result);
    }).catch(err => console.log(err))
    return etats;
});
*/

// ------------------------ THIS IS A TEST FOR SOPLANNING API
router.get('/synchronisationplanning', async function (req, res) {
    //composition de l'adresse
    let apiUrl = 'https://etudiant-cd74.soplanning.pro';
    let suffixUrl = '/api/endpoint/tasks?';
    let todayDateUtc = moment().utc().hours(0).minutes(0).seconds(0)
    let tomorrowDateUtc = moment().utc().hours(0).minutes(0).seconds(0).add(1, 'days')
    let todayPlusOneMonthDateUtc = moment().utc().hours(0).minutes(0).seconds(0).add(1, 'month')

    // On supprime toutes les interventions qui appartiennent au projet install du mois courant
    let apiGetParameters = "start_date=" + todayDateUtc.format('YYYY-MM-DD') + "&end_date=" + todayPlusOneMonthDateUtc.format('YYYY-MM-DD') + "&project_id=Install";
    var config = {
        method: 'get',
        url: apiUrl + suffixUrl + apiGetParameters,
        headers: {
            'SOPLANNING-API': 'api',
            'Cookie': 'sop3170planning_=t3m4fat8q2n3778h6cuce35s06'
        }
    };

    let soPlanningAlreadyExistingTasks = await axios(config).then(function (response) {
        return response.data
    }).catch(err => console.log(err))

    let soPlanningTaskIds = []
    for (let v = 0; v < soPlanningAlreadyExistingTasks.data.length; v++) {
        soPlanningTaskIds.push(soPlanningAlreadyExistingTasks.data[v].task_id)
    }
    for (let w = 0; w < soPlanningTaskIds.length; w++) {
        var config = {
            method: 'delete',
            url: apiUrl + "/api/endpoint/tasks/" + soPlanningTaskIds[w],
            headers: {
                'SOPLANNING-API': 'api',
                'Cookie': 'sop3170planning_=t3m4fat8q2n3778h6cuce35s06'
            }
        };
        await axios(config).then(function () {
            console.log('delete')
        }).catch(err => console.log(err))
    }

    /*
        // DEBUG : dates UTC du jour, du lendemain, du jour + 1 mois
        console.log('------------------------------------------')
        console.log(requestdateformatted)
        console.log(tomorrowdateformatted)
        console.log(requestdateformattedmonth)
        console.log('------------------------------------------')
    */

    // requête tous les agents
    let agents = await Agents.findAll()

    // On parcoure jour après jour
    while (!tomorrowDateUtc.isSame(todayPlusOneMonthDateUtc, 'day')) {
        for (let i = 0; i < agents.length; i++) {

            var soPlanningIdCurrentAgent = agents[i].identifiant_soplanning

            //on requete les interventions jour par jour pour chaque agent
            let interventions = await Interventions.findAll({
                include: [
                    {model: Motifs},
                    {model: TypesInter},
                    {model: Agents},
                    {model: Etats},
                    {
                        model: Abonnes,
                        include: {model: Personnes, include: {model: Adresses, include: {model: Coordonnees}}}
                    }],
                where: {
                    date: {
                        [Op.gte]: todayDateUtc,
                        [Op.lte]: tomorrowDateUtc
                    },
                    agentId: agents[i].id,
                }
            })

            let commentTask = "";
            for (let j = 0; j < interventions.length; j++) {

                // Si l'intervention est déjà presente dans SoPlanning | Ceci a été implementé en absence de méthode HTTP PUT dans l'API
                if (interventions[j].soplanning) {
                    await Interventions.update(
                        {soplanning: false},
                        {
                            where: {
                                id: interventions[j].id
                            }
                        }
                    )
                }

                let dateString = moment(interventions[j].date).utc().format("LLLL")
                commentTask += "" + dateString + " | " + interventions[j].abonne.personne.nom + " " + interventions[j].abonne.personne.prenom + " | " + interventions[j].abonne.personne.adresses.ville + " | " + interventions[j].abonne.numero_abo + " | " + interventions[j].commentaires + "\n"
                await Interventions.update(
                    {
                        soplanning: true
                    },
                    {
                        where: {
                            id: interventions[j].id
                        }
                    }
                )
            }


            if (commentTask != "") {

                let apiParameters = "task_id=&user_id=" + soPlanningIdCurrentAgent + "&project_id=Install&link_id&start_date=" + todayDateUtc.format('YYYY-MM-DD') + "&end_date=&start_time=" + todayDateUtc.format('HH:mm') + "&end_time=" + "23:00" + "&duration=&status_id=todo&title&comment=" + commentTask + "&link&resource_id=&place_id&milestone=&custom_field=&creator_id";
                var config = {
                    method: 'post',
                    url: apiUrl + suffixUrl + apiParameters,
                    headers: {
                        'SOPLANNING-API': 'api',
                        'Cookie': 'sop3170planning_=t3m4fat8q2n3778h6cuce35s06'
                    }
                };
                await axios(config).then((response) => {
                }).catch((err) => console.log(err))

            }
        }
        todayDateUtc.add(1, 'day')
        tomorrowDateUtc.add(1, 'day')
    }

    return res.status(201).send({message: "OK"})

    // TODO: Manque la duration quand on set un creneau plutôt qu'une start et end date.
});

module.exports = router;