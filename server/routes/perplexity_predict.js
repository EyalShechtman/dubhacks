const express= require('express');
const {Transaction } =require( './models/User');
const predictedBudget =require( '../perplexity');
const checkAuth =('../middleware/checkAuth');

const router=express.Router();

router.get('/predicted-budget',checkAuth,async(req,res)=>{
    try{
        const transactions=await Transaction.find({user:req.user.id});
        const pred_budget= await predictedBudget(transactions);
        res.status(201).json(pred_budget);
    }
    catch(error){
        console.error("Unable to predict budget",error);
        res.status(500).json({success:false,message:"failed predict"});
    }
});

module.exports=router;