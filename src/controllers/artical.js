const express = require('express')
const router = new express.Router()
const Artical = require('../models/artical')
const User = require('../models/user')
const auth = require('../middleware/auth')

var ArticalService = require('../services/artical')   

exports.getAllArticals = async (req, res) => {
    try {
        const articals = await ArticalService.getAllArticals({})
        res.send(articals)
    } catch (e) {
        res.status(500).send()
    }
}

exports.getRecentArticals = async (req, res) => {
    try {        
        const articals = await ArticalService.getRecentArticals({"createdAt":-1},3)
        res.send(articals)
    } catch (e) {
        res.status(500).send()
    }
}


exports.getArticalsByTopic = async (req, res) => {
    const _id = req.params.id;
    try {
        const artical = await ArticalService.getArticalsByTopic({TopicId: _id})
        
        if (!artical) {
            return res.status(404).send();
        }
        res.send(artical)
    } catch (e) {
        res.status(500).send()
    }
}

exports.editArtical = async (req, res) => {
  
    try {
        //const artical = await Artical.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})
        const artical = await ArticalService.editArtical(req.body,{ _id: req.params.id, Owner: req.user._id })        
       
        if (!artical) {
            return res.status(404).send();
        }
        res.send(artical)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.deleteArtical = async (req, res) => {
    const id = req.params.id;
    try {       
        const artical = await ArticalService.deleteArtical({ _id: id, Owner: req.user._id });       
        
        if (!artical) {
            return res.status(404).send();
        }
        res.send(artical)
    } catch (e) {
        res.status(500).send()
    }
}

exports.createArtical = async (req, res) => {
    try {
        const artical = await ArticalService.createArtical({
            ...req.body,
            Owner: req.user._id
        });      
        
        res.status(201).send(artical)
    } catch (e) {
        res.status(400).send(e)
    }
}


exports.commentOnArtical =  async (req, res) => {
    const _id = req.params.id;
    try {        
        const artical = await ArticalService.commentOnArtical({_id},{...req.body,userId : req.user._id});
        
        if (!artical) {
            return res.status(404).send();
        }        
        res.status(201).send(artical)
    } catch (e) {
        res.status(400).send(e.message)
    }
}


exports.followingUsers = async (req, res) => {
    const myUserId = req.user._id;   
    try {
        const articals = await ArticalService.followingUsers(myUserId);
        if (articals.length==0) {            
            return res.status(404).send();
        }          
        res.status(200).send(articals)
    } catch (e) {
        res.status(400).send(e.message)
    }
}


/*exports.usersArtical = async (req, res) => {

    const myUserId = req.user._id;   
    try {
        
        const user = await User.findOne({_id:myUserId})
        if (!user) {
            return res.status(404).send();
        }                
        const articals  = await user.populate('Owner')
        res.status(200).send(articals)
    } catch (e) {
        res.status(400).send(e.message)
    }
}*/

