const express=require('express');
const router=express.Router();
let Event=require('../models/Event');
const {loggedin}=require('../middleware');


router.post('/addevent',async (req,res)=>{
    try {
     let {img,event,date,seatleft,price,location}=req.body;
     await Event.create({img,event,date,seatleft,price,location});
     res.status(201).json({msg:"new quote successfully"});
    } catch (error) {
        res.json({});
    }
    

})
router.get('/getevent',async (req,res)=>{
    try {
        let events=await Event.find();
    res.json(events);
    } catch (error) {
        res.json({});
    }
    
})
router.get('/getevent/:id',async (req,res)=>{
    try {
        let {id}=req.params;
    
        let events=await Event.findById(id);
         res.json(events);
    } catch (error) {
        res.json({});
    }
    
})
router.post('/delete/:id',async (req,res)=>{
    try {
        let {id}=req.params;
    await Event.findByIdAndDelete(id);
    res.json({msg:"deleted successfully"});
    } catch (error) {
        res.json({});
    }
    
})
router.put('/edit/:id',async (req,res)=>{
    try {
    let {id}=req.params;
    let {img,event,date,seatleft,price,location}=req.body;
    await Event.findByIdAndUpdate(id,{img,event,date,seatleft,price,location});
    res.json({msg:"updated successfully"});
    } catch (error) {
        res.json({});
    }
    
})
router.get('/searchevent/:searcheve',async (req,res)=>{
    let {searcheve}=req.params;
      
    try {
        
        let {searcheve}=req.params;
     
        console.log(searcheve);
        let search=await Event.find();
        let search2=await Event.find();
        let search3=await Event.find();
        let search4=await Event.find();
        console.log(search);
        if(searcheve)
        {
            console.log(searcheve)
            searcheve=searcheve.trim();
            searcheve=searcheve.toLowerCase();
           
            
            search=search.filter((x,index)=>{
                let sh=x.event.trim().toLowerCase();
                console.log(sh);
                let cnt=0;
                for(let ch of sh){
                    for(let c of searcheve)
                    {
                        if(c===ch)
                        {
                            
                            console.log(ch);
                            cnt++;
                            break;
                        }
                    }
                }
                console.log(cnt);
                if(cnt>=searcheve.length)
                {
                    return x;
                }

                
            });
            
            

        }
        if(searcheve)
        {
            searcheve=searcheve.trim();
            searcheve=searcheve.toLowerCase();
           
            
            search2=search2.filter((x,index)=>{
                let sh=x.event.trim().toLowerCase();
                console.log(sh);
                let cnt=0;
                for(let ch of searcheve){
                    for(let c of sh)
                    {
                        if(ch===c)
                        {
                            
                            console.log(ch);
                            cnt++;
                            break;
                        }
                    }
                }
                console.log(cnt);
                if(cnt>=x.event.length)
                {
                    return x;
                }

                
            });}
            if(searcheve)
        {
            searcheve=searcheve.trim();
            searcheve=searcheve.toLowerCase();
           
            console.log(searcheve);
            search3=search3.filter((x)=>{

                
                // console.log("location"+x.location);
                if(x.location.length>0){
                let sh=x.location.trim().toLowerCase();
                console.log(sh);
                let cnt=0;
                for(let ch of searcheve){
                    for(let c of sh)
                    {
                        if(ch===c)
                        {
                            
                            console.log(ch);
                            cnt++;
                            break;
                        }
                    }
                }
                console.log(cnt);
                if(cnt>=searcheve.length)
                {
                    return x;
                }
            }

                
            });}
            if(searcheve)
        {
            searcheve=searcheve.trim();
            searcheve=searcheve.toLowerCase();
           
            
            search4=search4.filter((x,index)=>{
                let sh=x.location.trim().toLowerCase();
                console.log(searcheve);
                console.log(sh);
                let cnt=0;
                for(let ch of sh){
                    for(let c of searcheve)
                    {
                        if(ch===c)
                        {
                            
                            console.log(ch);
                            cnt++;
                            break;
                        }
                    }
                }
                console.log(cnt);
                if(cnt>=x.location.length)
                {
                    return x;
                }

                
            });}
            console.log(search3);
           console.log(search3);
            // res.json(search);
        if(search3.length>0){
        res.json(search3);}
        else if(search4.length>0){
            res.json(search4);
        }
        else if(search.length>0)
        {
            res.json(search);
        }
        else{
            res.json(search2);
        }
    //     else if(search4.length>0)
    //     {
    //         res.json(search4);
    //     }
    //     else if(search4.length>0)
    //     {
    //         res.json(search4);
    //     }
    //    else{
    //    res.json(search3);}
    } catch (error) {
        res.status(424).json({"msg":"false"});
    }
    
})
router.post('/addtocart/:id',async (req,res)=>{
    try {
        let {id}=req.params;
        let event=await Event.findById(id);
       res.json({});
    } catch (error) {
        res.json({});
    }
   
})
router.put('/seat/:id',async (req,res)=>{
    let {id}=req.params;
    let data=await Event.findById(id);
    console.log(data.seatleft);
    let {seatleft}=data;
    if(seatleft>=1)
    {
        
        seatleft=seatleft-1;
        console.log(seatleft);
        await Event.findByIdAndUpdate(id,{seatleft});
        res.json({"msg":"ticket booked successfully"});
    }
    else{
    res.json({});}

})
router.get('/getlog',(req,res)=>{
    res.json({"msg":"true"});
})
module.exports=router;