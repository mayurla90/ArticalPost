var User = require('../models/user')



exports.registerUser = async (userObj) => {
    const user = new User(userObj);
    try {
        await user.save();   
        return user
    } catch (e) {
        throw Error(e)
    }
} 

exports.loginUser = async(email,password) => {
    try{
     const user = await User.findByCredentials(email,password);
     const token = await user.generateAuthToken();
     return {user, token }
    }catch(e){
        throw Error(e)
    }
 }

 exports.followUser = async (fuserId, _id) => {   
    try {        
        const user = await User.findOne({_id})
        if (!user) {
             throw Error("User not found")
        }       
        var Duplicate= user.following.find(s => s.userId== fuserId);
         if (typeof (Duplicate) === "undefined"){
            user.following.push( {userId : fuserId});
            await user.save() 
         }
         return user
    } catch (e) {
        throw Error(e.message)
    }
}

exports.unfollowUser = async (fuserId, _id) => {
   
    try {        
        const user = await User.findOne({_id})
        if (!user) {
            throw Error("User not found")
        }    
        user.following = user.following.filter(function(user) { 
            return user.userId != fuserId;  
         });  
         
        await user.save()         
        return user
    } catch (e) {
        throw Error(e.message)
    }
}