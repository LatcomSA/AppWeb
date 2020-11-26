const passport = require('passport');
const User = require('../model/User');
const LocalStrategy = require('passport-local').Strategy;
const encrypt = require('../controllers/encrypt');

const Joi = require('joi');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {
   
    // Validate if the input data is correct
    const schema = {
        email:Joi.string().required().email({ minDomainAtoms: 2 }),
        password:Joi.string().min(5).max(255).required().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
        
    const {error} = Joi.validate(req.body, schema);  
    if (error){
        console.log('data not valido')
        return done(null, false, req.flash('message','The input data is not correct'));
    }

    // Validate if the user does not exist
    let user = await User.findOne({
        where: {
            email: email
        },
        attributes: ['user_id','name','lastname','email','password']
    })
    if(!user){
        console.log('This account does not exist: Incorrect email or password.');
        return done(null, false, req.flash('This account does not exist: Incorrect email or password.'));     
    } else {
        const validPassword = await encrypt.matchPassword(password, user.password);
        if (validPassword) {      
            console.log('welcome '+ user.name + ' '+ user.lastname);
            done(null, user, req.flash('success','welcome '+ user.name + ' '+ user.lastname));
        } else {
            console.log('password incorrect');
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }

}));


passport.serializeUser((user,done)=>{
    done(null,user.user_id);
});

passport.deserializeUser(async(id,done)=>{

    let user = await User.findOne({
        where: {
            user_id: id
        }
    });    
    done(null, user);
});
