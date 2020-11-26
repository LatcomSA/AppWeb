const express = require('express');
const Transaction = require('../model/Transaction');
const router = express.Router();
const verifyToken = require('../controllers/verifyToken')


router.put('/transaction/inactive/:id',verifyToken,async (req,res) =>{

    try {
        // Verify if the user exists        
        let user = await Transaction.findOne({
            where: {
                user_id: req.userId
            }
        });       
        if(!user){
            return res.status(404).send('the user does not have transaction yet');
        }
        //create the transaction
        let transaction = await Transaction.update({ 
            status: 0 
            }, {
            where: {                
                transaction_id: req.params.id,
                user_id: req.userId,
                status: 1 
            },
        });
        res.json({
            error: false,
            transaction
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: 'Error: The transaction could not be inactive!'
        });
    }
  
});

module.exports = router;