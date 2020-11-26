const express = require('express');
const Transaction = require('../model/Transaction');
const router = express.Router();
const verifyToken = require('../controllers/verifyToken')


router.post('/transaction/excel',verifyToken,async (req,res) =>{

    try {
        // Verify if the user exists        
        let user = await Transaction.findOne({
            where: {
                user_id: req.userId
              },
                attributes: ['transaction_id','created_date','value','points','status']           
        });       
        if(!user){
            return res.status(404).send('The user does not have transactions');
        }
        res.xls('data.xlsx', user);
        res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.download(__dirname + '/data.xlsx');
        //console.log(res);
       
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: 'Error: could not export to excel!'
        });
    }
  
});

module.exports = router;