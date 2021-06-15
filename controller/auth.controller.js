var db = require('../config/db.config.js')
const config = require("../config/auth.config");

const Utilisateurs = db.utilisateurs;

const Status = db.status;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    Utilisateurs.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(utilisateurs => {
            if (req.body.roles) {
                Status.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    utilisateurs.setRoles(roles).then(() => {
                        res.send({ message: "Utilisateur enregistré!" });
                    });
                });
            } else {
                // user role = 1
                utilisateurs.setRoles([1]).then(() => {
                    res.send({ message: "User registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    Utilisateurs.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(utilisateurs => {
            if (!utilisateurs) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                utilisateurs.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: utilisateurs.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            utilisateurs.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: utilisateurs.id,
                    username: utilisateurs.username,
                    email: utilisateurs.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};