const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require("../controllers/auth");
const router = express.Router();

const passport = require('passport');

router.get('/signup',(req,res)=>{
    res.send('Welcome to abc, Sign Up to start win points')
});


router.post('/signup',isNotLoggedIn,passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/failure',
        failureFlash: false   
    }));


router.get('/profile',(req,res) =>{
    res.send('This is your abc Profile')
});

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/signup");
});

router.get("/failure",(req,res)=>{
    res.send('Ya se encuentra registrado');
});

module.exports = router;