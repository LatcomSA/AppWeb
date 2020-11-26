const express = require('express');
const Transaction = require('../model/Transaction');
const User = require('../model/User');
const Joi = require('joi');
const router = express.Router();
const verifyToken = require('../controllers/verifyToken')


router.post('/transaction/create',verifyToken,async (req,res) =>{
    // Validate if the input data is correct
    const schema = {
        value: Joi.number().min(0).required(),
        points: Joi.number().min(0).required(),
    }        
    const {error} = Joi.validate(req.body, schema);  
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    try {
        // Verify if the user exists        
        let user = await User.findOne({
            where: {
                user_id: req.userId
            }
        });       
        if(!user){
            return res.status(404).send('No user found');
        }
        //create the transaction
        let transaction = await Transaction.create({
            user_id: req.userId,
            created_date: new Date(),
            value: req.body.value,
            points: req.body.points
        });
        res.json({
            error: false,
            transaction
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: 'Error: Could not created the transaction!'
        });
    }
  
});

module.exports = router;