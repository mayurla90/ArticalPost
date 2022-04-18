const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')




router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();   
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login',async(req,res)=> {
   try{
    const user = await User.findByCredentials(req.body.email,req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token })
   }catch(e){
    res.status(400).send(e);
   }
})

router.post('/users/logout',auth,async(req,res) =>{
 try{
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token;
    })
    await req.user.save();
    res.send()
 }catch(e){
   res.status(500).send()
 }
})   
  
// following user


router.post('/users/following/:id', auth, async (req, res) => {
    const fuserId = req.params.id;
    const _id = req.user._id;
    try {
        
        const user = await User.findOne({_id})
        if (!user) {
            return res.status(404).send();
        }       
        var Duplicate= user.following.find(s => s.userId== fuserId);
         if (typeof (Duplicate) === "undefined"){
            user.following.push( {userId : fuserId});
            await user.save() 
         }
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})


// un following user


router.post('/users/unfollowing/:id', auth, async (req, res) => {
    const fuserId = req.params.id;
    const _id = req.user._id;
    try {
        
        const user = await User.findOne({_id})
        if (!user) {
            return res.status(404).send();
        }    

        user.following = user.following.filter(function(user) { 
            return user.userId != fuserId;  
         });       
         
        await user.save()         
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})




module.exports = router;