var UserService = require('../services/user')    



exports.registerUser = async (req, res) => {    
    try {
        const user = await UserService.registerUser(req.body)         
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
} 
exports.loginUser = async(req,res) => {
    try{
    const user = await UserService.loginUser(req.body.email,req.body.password);      
     res.send(user)
    }catch(e){
     res.status(400).send(e);
    }
 }
exports.logoutUser = async(req,res) =>{
    try{
       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token;
       })
       await req.user.save();
       res.send()
    }catch(e){
      res.status(500).send()
    }
   }

exports.followUser = async (req, res) => {
    const fuserId = req.params.id;
    const _id = req.user._id;
    try { 
        const user = await UserService.followUser(fuserId,_id);    
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
}
exports.unfollowUser = async (req, res) => {
    const fuserId = req.params.id;
    const _id = req.user._id;
    try {        
        const user = await UserService.unfollowUser(fuserId,_id);       
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
}


