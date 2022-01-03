const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Account = require('../Models/Account.js');
const token_key = process.env.TOKEN_KEY
module.exports = {
    signup: (req, res, next) => {
        var email = req.body.email;
        // checks if email already exists
        Account.findEmail(email, (err, user) => {
            if (err)
                return res.status(500).json(err);

            if (user.length > 0) {
                return res.status(409).json({ message: "email already exists" });

            } else if (req.body.email && req.body.password) {
                // password hash
                bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                    if (err) {
                        return res.status(500).json({ message: "couldnt hash the password" });
                    } else if (passwordHash) {
                        //create user account
                        return Account.create({
                            email: req.body.email,
                            name: req.body.name,
                            password: passwordHash,
                            photo: req.body.photo,
                            googleBool: req.body.google,
                            country: req.body.country,

                        }, (err, user) => {
                            if (err)
                                res.status(502).json({ message: "error while creating the user" });
                            else {
                                //if acc created successfully, send token and success
                                const token = jwt.sign({ email: req.body.email }, token_key, {});
                                res.status(200).json({ message: "user created", token: token });
                            }

                        })

                    };
                });
            }
            else if (!req.body.password) { //no password provided
                if (!req.body.google)
                    return res.status(400).json({ message: "password not provided" });
                else { //if no password provided and it's a google signup case
                    return Account.create({
                        email: req.body.email,
                        name: req.body.name,
                        password: null,
                        photo: req.body.photo,
                        googleBool: req.body.google,
                        country: null,

                    }, (err, user) => {
                        if (err)
                            res.status(502).json({ message: "error while creating the user" });
                        else {
                            //sent token and return success
                            const token = jwt.sign({ email: req.body.email }, token_key, {});
                            res.status(200).json({ message: "user created", token: token });
                        }

                    })

                }
            } else if (!req.body.email) {
                return res.status(400).json({ message: "email not provided" });
            };


        })
            .catch(err => {
                res.status(502).json({ message: "error while signing up" });
            });


    },


    login: (req, res, next) => {

        var email = req.body.email;
        // checks if email already exists


        Account.findEmail(email, (err, user) => {

            if (err) {
                return res.status(500).json(err);

            }
            if (user.length == 0) {
                return res.status(404).json({ message: "user not found" });
            }
            if (req.body.google) {
                console.log("EMAIIIIIIL" + req.body.email);
                const token = jwt.sign({ email: req.body.email }, token_key, {});
                res.status(200).json({ message: "user logged in", token: token });
            }
            else {
                Account.getPassword(email, (err, password) => {
                    if (err) {
                        return res.status(500).json(err);

                    }
                    if (password) {
                        // password hash
                        bcrypt.compare(req.body.password, password, (err, compareRes) => {
                            if (err) { // error while comparing
                                res.status(502).json({ message: "error while checking user password" });
                            } else if (compareRes) { // password match
                                const token = jwt.sign({ email: req.body.email }, token_key, {});
                                res.status(200).json({ message: "user logged in", token: token });
                            } else { // password doesnt match
                                res.status(401).json({ message: "invalid credentials" });
                            };
                        });
                    }

                })

            };
        })
            .catch(err => {
                res.status(502).json({ message: "error while logging in" });
            });
    }

}