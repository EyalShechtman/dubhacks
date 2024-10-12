const mongoose= require('mongoose');
const MONGODB_URI='mongodb+srv://lakshey2016:Lakshey123!@romerest.ik1wu.mongodb.net/?retryWrites=true&w=majority&appName=RomeRest';



mongoose.connect(MONGODB_URI)
.then(()=>console.log('Connect success'))
.catch((err)=>console.error('Connection error',err));



const User_Schema=new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String,required:true},
    interests:{type:String}

});

const Transactions_Schema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    vendor_name:{type:String},
    category:{type:String},
    amount:{type:Number},
    date:{type:Date,default:Date.now},
    location:{type:String}
});

const User=mongoose.model('User',User_Schema);
const Transaction=mongoose.model('User',Transactions_Schema);


module.exports={User,Transaction};