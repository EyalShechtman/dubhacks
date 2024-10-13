const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    creditCard: {
        number: { type: String, required: true },
        expiryDate: { type: String, required: true },
        cvv: { type: String, required: true }
    },
    wallet:{type:Number,default:0},
    income:{type:Number,required:true},
    budget: {
        food: {
            max: { type: Number,default:0},
            spent: { type: Number}
        },
        travel: {
            max: { type: Number,default:0},
            spent: { type: Number}
        },
        health: {
            max: { type: Number,default:0},
            spent: { type: Number}
        },
        other: {
            max: { type: Number,default:0},
            spent: { type: Number}
        }
    },
    investmentPortfolio: {
        investmentComfort: { type: String, enum: ['conservative', 'moderate', 'aggressive'], required: true },
        investmentType: { type: String, enum: ['roundup', 'budget remaining', 'both'], required: true }
    }
});

const Transactions_Schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vendor_name: { type: String },
    category: { type: String },
    amount: { type: Number },
    date: { type: Date, default: Date.now },
    location: { type: String }
});

const User = mongoose.model('User', User_Schema);
const Transaction = mongoose.model('Transaction', Transactions_Schema);

module.exports = { User, Transaction };
