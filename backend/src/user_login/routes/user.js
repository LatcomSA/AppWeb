const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require("../controllers/auth");
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const passport = require('passport');

router.get('/signin',(req,res)=>{
    res.send('Welcome to abc, Sign In to continue win points')
});


router.post('/signin', async (req, res, next) => {
    passport.authenticate('local.signin', async (err, user, info) => {     
    try {
        if(err || !user){
          const error = new Error('An Error occurred')
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const token = jwt.sign({id: user.user_id}, config.secret,{
                expiresIn: 60*60*24
            })
          return res.json({ token });
        });     } catch (error) {
        return next(error);
    }
    })(req, res, next);
});


router.get('/profile',(req,res) =>{
    res.send('This is your abc Profile')
});

router.get("/logout",isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect("/signin");
});


module.exports = router;