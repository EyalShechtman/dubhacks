require('dotenv').config();
const mongoose = require('mongoose');
const { User, Transaction } = require('./models/User');
const MONGODB_URI = 'mongodb+srv://lakshey2016:Lakshey123!@romerest.ik1wu.mongodb.net/roamerest?retryWrites=true&w=majority&appName=RomeRest';

// Check if the connection is already established
if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("MongoDB connection successful");
            fakedata();
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB', err);
        });
} else {
    console.log('MongoDB connection already active');
    fakedata();  // Call your fakedata function if the connection is already active
}

async function fakedata() {
    try {
        await User.deleteMany({});
        await Transaction.deleteMany({});

        const users = [
            { email: 'ethanle425@gmail.com', password: 'epicswag',creditCard:{number:'12345',expiryDate:'123',cvv:'123'},income:123000, investmentPortfolio:{investmentComfort:'conservative',investmentType:'roundup'} },
            { email: 'lakshey23@gmail.com', password: 'Lakshey123!',creditCard:{number:'12345',expiryDate:'123',cvv:'123'},income:93000 , investmentPortfolio:{investmentComfort:'conservative',investmentType:'roundup'} },
            { email: 'tsamples445@gmail.com', password: 'omegalul@#',creditCard:{number:'12345',expiryDate:'123',cvv:'123'},income:40000, investmentPortfolio:{investmentComfort:'conservative',investmentType:'roundup'}  },
            { email: 'eyalllllll1@gmail.com', password: 'peepopeepopeepo23',creditCard:{number:'12345',expiryDate:'123',cvv:'123'},income:50000, investmentPortfolio:{investmentComfort:'conservative',investmentType:'roundup'}  },
            { email: 'bigmanmoves23@gmail.com', password: 'bowowowow3',creditCard:{number:'12345',expiryDate:'123',cvv:'123'},income:60000, investmentPortfolio:{investmentComfort:'conservative',investmentType:'roundup'}  }
        ];

        const user_list = [];
        for (const user of users) {
            const user_info = new User(user);
            await user_info.save();
            user_list.push(user_info);
            console.log(`User created: ${user.email}`);
        }

        const transactions = [
            { user: user_list[0]._id, vendor_name: "Chick-Fil-A", category: "Food", amount: 21.24, date: new Date('2024-08-07'), location: 'Seattle, WA' },
            { user: user_list[0]._id, vendor_name: "McDonalds", category: "Food", amount: 13.43, date: new Date('2024-09-10'), location: 'Renton, WA' },
            { user: user_list[0]._id, vendor_name: "Safeway Gas Station", category: "Travel", amount: 40.00, date: new Date('2024-09-11'), location: 'Kent, WA' },
            { user: user_list[1]._id, vendor_name: "Walgreens", category: "Health", amount: 103.93, date: new Date('2024-04-12'), location: 'Chicago, IL' },
            { user: user_list[1]._id, vendor_name: "Dave & Busters Co.", category: "Other", amount: 150.56, date: new Date('2024-05-07'), location: 'Chicago, IL' },
            { user: user_list[1]._id, vendor_name: "Copley Memorial Hospital", category: "Health", amount: 976.95, date: new Date('2024-05-08'), location: 'Aurora, IL' },
            { user: user_list[2]._id, vendor_name: "UW Fiscal Services", category: "Other", amount: 4768.32, date: new Date('2024-09-13'), location: 'Seattle, WA' },
            { user: user_list[2]._id, vendor_name: "Saigon Deli", category: "Food", amount: 42.56, date: new Date('2024-09-15'), location: 'Seattle, WA' },
            { user: user_list[2]._id, vendor_name: "Seattle Public Metro", category: "Travel", amount: 4.50, date: new Date('2024-10-01'), location: 'Seattle, WA' },
            { user: user_list[3]._id, vendor_name: "Ivar's Seafood", category: "Food", amount: 67.43, date: new Date('2024-04-11'), location: 'Tukwila, WA' },
            { user: user_list[3]._id, vendor_name: "Ivar's Seafood", category: "Food", amount: 80.54, date: new Date('2024-04-18'), location: 'Tukwila, WA' },
            { user: user_list[3]._id, vendor_name: "7-11 Gas Station", category: "Travel", amount: 50.00, date: new Date('2024-04-23'), location: 'Renton, WA' },
            { user: user_list[4]._id, vendor_name: "Best Buy", category: "Other", amount: 980.75, date: new Date('2024-08-22'), location: 'Portland, OR' },
            { user: user_list[4]._id, vendor_name: "Amazon Online Services", category: "Other", amount: 101.23, date: new Date('2024-08-26'), location: 'Salem, OR' },
            { user: user_list[4]._id, vendor_name: "Safeway Pharmacy", category: "Health", amount: 70.23, date: new Date('2024-08-28'), location: 'Salem, OR' }
        ];

        for (const transac of transactions) {
            const transac_info = new Transaction(transac);
            await transac_info.save();
            console.log(`Transaction created for user ID: ${transac.user}`);
        }

        console.log('Fake data creation complete');
        mongoose.connection.close();
    } catch (err) {
        console.error('Failed to create fake data', err);
        mongoose.connection.close();
    }
}
