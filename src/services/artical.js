
const Artical = require('../models/artical')
const User = require('../models/user')


exports.getAllArticals = async (query) => {
    try {
        const articals = await Artical.find(query);
        return articals
    } catch (e) {
        throw Error(e)
    }
}

exports.getRecentArticals = async (sortObj,limitNum) => {
    try {
        const articals = await Artical.find().sort(sortObj).limit(limitNum);;
        return articals
    } catch (e) {
        throw Error(e)
    }
}

exports.getArticalsByTopic = async (query) => {  
    try {
        const artical = await Artical.find(query)
        return artical
    } catch (e) {
        res.status(500).send()
    }
}



exports.editArtical =  async ( body,query) => {

    const updates = Object.keys(body);
    const allowedUpdates = ['name', 'Description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        throw Error({ error: "invalid updates" })
    }
    try {
        //const artical = await Artical.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})
        const artical = await Artical.findOne(query)
        if (!artical) {
            return artical
        }
        updates.forEach((update) => artical[update] = body[update])
        await artical.save();

        return artical
    } catch (e) {
        throw Error(e)
    }
}

exports.deleteArtical =  async (query) => {
    try {  
        const artical = await Artical.findOneAndDelete(query);
        return artical
    } catch (e) {
        throw Error(e)
    }
}


exports.createArtical = async (query) => {
    try {
        // const artical = new Artical(req.body);
        const artical = new Artical(query);
        await artical.save()
        return artical
    } catch (e) {
        throw Error(e)
    }
}

exports.commentOnArtical =  async (query,data) => {   
    try {        
        const artical = await Artical.findOne(query)       
        artical.Comments.push(data);
        await artical.save()
        return artical
    } catch (e) {
        throw Error(e)
    }
}

exports.followingUsers =  async (myUserId) => {
    try {
        const articals = [];
        const user = await User.findOne({_id:myUserId})
        if (!user) {
           return;
        }
        user.following.map(async(d) => {
       
            const artical = await Artical.find({Owner: d.userId})
           
            if (artical) {                             
                artical.forEach((item) => {  
                      articals.push(item)
                });
            }            
        })
        return artical
    } catch (e) {
        throw Error(e)
    }
}

