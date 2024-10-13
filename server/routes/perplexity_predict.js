const express= require('express');
const {Transaction,User } =require( './models/User');
const predictedBudget =require( '../perplexity');
const checkAuth =require('../middleware/checkAuth');

const router=express.Router();

router.get('/predicted-budget',checkAuth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({success:false,message:"user not found"});
        }
        const transactions=await Transaction.find({user:req.user.id});
        const pred_budget= await predictedBudget(transactions,user);
        if(!pred_budget.success){
            return res.status(500).json({success:false,message:'failed to predict budget',error:pred_budget.error});
        }
        res.status(200).json(pred_budget);
    }
    catch(error){
        console.error("Unable to predict budget",error);
        res.status(500).json({success:false,message:"failed predict"});
    }
});

module.exports=router;