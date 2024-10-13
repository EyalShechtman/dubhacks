require('dotenv').config();
const mongoose= require('mongoose');
const{User,Transaction}=require('./models/User');
const MONGODB_URI='mongodb+srv://lakshey2016:Lakshey123!@romerest.ik1wu.mongodb.net/?retryWrites=true&w=majority&appName=RomeRest';

mongoose.connect(MONGODB_URI)
.then(()=>{console.log("Fake connection data success"); fakedata();})
.catch((err)=>{console.error('Failed to connect to fake data',err)});


async function fakedata(){
    try{
        await User.deleteMany({});
        await Transaction.deleteMany({});


        const users=[
            {email:'ethanle425@gmail.com',password:'epicswag'},
            {email:'lakshey23@gmail.com',password:'Lakshey123!'},
            {email:'tsamples445@gmail.com',password:'omegalul@#'},
            {email:'eyalllllll1@gmail.com',password:'peepopeepopeepo23'},
            {email:'bigmanmoves23@gmail.com',password:'bowowowow3'},
        ];
        const user_list=[];
        for (const user of users){
            const user_info=new User(user);
            await user_info.save();
            user_list.push(user_info);
            console.log(`User created: ${user.email}`);
        }
        const transactions=[
            {
            user:user_list[0]._id,
            vendor_name:"Chick-Fil-A",
            category:"Food",
            amount:21.24,
            date: new Date('2024-08-07'),
            location:'Seattle, WA'
            },
            {
            user:user_list[0]._id,
            vendor_name:"McDonalds",
            category:"Food",
            amount:13.43,
            date: new Date('2024-09-10'),
            location:'Renton, WA'
            },
            {
            user:user_list[0]._id,
            vendor_name:"Safeway Gas Station",
            category:"Travel",
            amount:40.00,
            date: new Date('2024-09-11'),
            location:'Kent, WA'
            },
            {
            user:user_list[1]._id,
            vendor_name:"Walgreens",
            category:"Health",
            amount:103.93,
            date: new Date('2024-04-12'),
            location:'Chicago, IL'
            },
            {
            user:user_list[1]._id,
            vendor_name:"Dave & Busters Co.",
            category:"Other",
            amount:150.56,
            date: new Date('2024-05-07'),
            location:'Chicago, IL'
            },
            {
            user:user_list[1]._id,
            vendor_name:"Copley Memorial Hospital",
            category:"Health",
            amount:976.95,
            date: new Date('2024-05-08'),
            location:'Aurora, IL'
            },
            {
            user:user_list[2]._id,
            vendor_name:"UW Fiscal Services",
            category:"Education",
            amount:4768.32,
            date: new Date('2024-09-13'),
            location:'Seattle, WA'
            },
            {
            user:user_list[2]._id,
            vendor_name:"Saigon Deli",
            category:"Food",
            amount:42.56,
            date: new Date('2024-09-15'),
            location:'Seattle, WA'
            },
            {
            user:user_list[2]._id,
            vendor_name:"Seattle Public Metro",
            category:"Travel",
            amount:4.50,
            date: new Date('2024-10-01'),
            location:'Seattle, WA'
            },
            {
            user:user_list[3]._id,
            vendor_name:"Ivar's Seafood",
            category:"Food",
            amount:67.43,
            date: new Date('2024-04-11'),
            location:'Tukwila, WA'
            },
            {
            user:user_list[3]._id,
            vendor_name:"Ivar's Seafood",
            category:"Food",
            amount:80.54,
            date: new Date('2024-04-18'),
            location:'Tukwila, WA'
            },
            {
            user:user_list[3]._id,
            vendor_name:"7-11 Gas Station",
            category:"Travel",
            amount:50.00,
            date: new Date('2024-04-23'),
            location:'Renton, WA'
            },
            {
            user:user_list[4]._id,
            vendor_name:"Best Buy",
            category:"Other",
            amount:980.75,
            date: new Date('2024-08-22'),
            location:'Portland, OR'
            },
            {
            user:user_list[4]._id,
            vendor_name:"Amazon Online Services",
            category:"Other",
            amount:101.23,
            date: new Date('2024-08-26'),
            location:'Salem, OR'
            },
            {
            user:user_list[4]._id,
            vendor_name:"Safeway Pharmacy",
            category:"Health",
            amount:70.23,
            date: new Date('2024-08-28'),
            location:'Salem, OR'
            },
            
        ];
        const trans_list=[];
        for (const transac of transactions){
            const transac_info=new Transaction(transac);
            await transac_info.save();
            trans_list.push(transac_info);
            console.log(`Transaction created: ${transac.email}`);
        }
        console.log('Created data');
        mongoose.connection.close();

    }
    catch(err){
        console.error('Failed to create fake data ',err);
        mongoose.connection.close();
    }
}