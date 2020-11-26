const express = require('express');
const Transaction = require('../model/Transaction');
const router = express.Router();
const verifyToken = require('../controllers/verifyToken')


router.get('/transaction/history',verifyToken,async (req,res) =>{

    try {
        // Verify if the user exists        
        let user = await Transaction.findOne({
            where: {
                user_id: req.userId
            }
        });       
        if(!user){
            return res.status(404).send('The user does not have transactions');
        }
        //create the transaction
        let transaction = await Transaction.findAll({
            attributes: ['transaction_id','created_date','value','points','status'],
            order:[['created_date','DESC']],
            where: {
            user_id: req.userId
            }
        });
        res.json({
            error: false,
            transaction
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: 'Error: could not send history!'
        });
    }
  
});

module.exports = router;