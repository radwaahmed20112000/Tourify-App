import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import Account from '../models/Account.js';

const signup = (req, res, next) => {
    var email = req.body.email;
    // checks if email already exists


    Account.findEmail(email, (err, user) =>{
         
        if(err)
           return res.status(500).json(err);
        
        if(user.length>0){
            return res.status(409).json({message: "email already exists"});

        }else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return Account.create({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                        photo : req.body.photo,
                        googleBool:req.body.bool,
                        country:req.body.country,

                    },(err, user) =>{
                        if(err)
                            res.status(502).json({message: "error while creating the user"});
                        else {
                            const token = jwt.sign({ email: req.body.email }, 'secret', {});
                            res.status(200).json({message: "user created","token" : token});
                        }
                            
                    })
                    
                };
            });
        }
         else if (!req.body.password) {
            if(!req.body.bool) 
                return res.status(400).json({message: "password not provided"});
            else{
                return Account.create({
                    email: req.body.email,
                    name: req.body.name,
                    password: null,
                    photo : req.body.photo,
                    googleBool:req.body.bool,
                    country:null,

                },(err, user) =>{
                    if(err)
                        res.status(502).json({message: "error while creating the user"});
                    else {
                        const token = jwt.sign({ email: req.body.email }, 'secret', {});
                        res.status(200).json({message: "user created","token" : token});
                    }
                       
                })

            }
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };


     })


   
};








const login = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', {});
                    res.status(200).json({message: "user logged in", "token": token});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};






export { signup, login };
