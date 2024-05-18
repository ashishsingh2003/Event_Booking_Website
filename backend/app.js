
const express=require('express');
const app=express();
let Event=require('./models/Event');
const mongoose = require('mongoose');
const payment=require('./apis/paymentroute')
const user=require('./models/User');
const userroute=require('./apis/userroute')
const cors=require('cors');
const session=require('express-session');
const eventroute=require('./apis/eventroute');
mongoose.connect('mongodb://127.0.0.1:27017/Event')
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log("error");
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly:true,
      expires:Date.now()+24*7*60*60*1000,
      maxAge:24*7*60*60*1000
     }
  }))
app.use(express.urlencoded({extended:true}));
//seedDB();
app.use(express.json());
app.use(cors({origin:['http://localhost:5173']}));
app.use(userroute);
app.use(eventroute);
//app.use(payment);
const passportlocalmong=require('passport-local-mongoose');
const passport=require('passport');
const LocalStrategy=require('passport-local');

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser());//for setting id as cookie in user's browser
passport.deserializeUser(user.deserializeUser());
passport.use(new LocalStrategy(user.authenticate()));
require("dotenv").config();
const stripe=require("stripe")(process.env.SECRET_STRIPE_KEY)
app.post('/checkout',async (req,res)=>{
    
   
    try {
        
        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items:req.body.items.map(item=>{
                
                return {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:item.name
                        },
                        unit_amount:(item.price)*100,
                    },
                  
                    quantity:item.quantity
                }
               
               
            }),
           
            success_url:`http://localhost:5173/success/${req.body.items[0].id}`,
            cancel_url:"http://localhost:5173/cancel"

        })
       
        res.json({url:session.url})
    } catch (error) {
        console.log("can not pay");
        console.log(error.message);
        res.json({error:error.message});
    }
})
app.listen('8081',()=>{
    console.log("server connected");
})