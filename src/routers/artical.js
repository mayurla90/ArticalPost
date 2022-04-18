const express = require('express')
const router = new express.Router()
const Artical = require('../model/artical')
const auth = require('../middleware/auth')

// get all articals
router.get('/articals', auth, async (req, res) => {
    try {
        const articals = await Artical.find({});
        res.send(articals)
    } catch (e) {
        res.status(500).send()
    }
})


// get most recent articals *Top 3
router.get('/articals/recent', auth, async (req, res) => {
    try {
        const articals = await Artical.find().sort({"createdAt":-1}).limit(3);;
        res.send(articals)
    } catch (e) {
        res.status(500).send()
    }
})


// Get articals by topic
router.get('/articals/topic/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {

        const artical = await Artical.find({TopicId: _id})
        if (!artical) {
            return res.status(404).send();
        }
        res.send(artical)
    } catch (e) {
        res.status(500).send()
    }
}) 

// edit artical
router.patch('/articals/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'Description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
        //const artical = await Artical.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})
        const artical = await Artical.findOne({ _id: req.params.id, Owner: req.user._id })
        if (!artical) {
            return res.status(404).send();
        }

        updates.forEach((update) => artical[update] = req.body[update])
        await artical.save();

        res.send(artical)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/articals/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        //const artical = await Artical.findByIdAndDelete(id);

        const artical = await Artical.findOneAndDelete({ _id: id, Owner: req.user._id });
        if (!artical) {
            return res.status(404).send();
        }
        res.send(artical)
    } catch (e) {
        res.status(500).send()
    }
})


// Create artical
router.post('/articals', auth, async (req, res) => {
    try {
        // const artical = new Artical(req.body);
        const artical = new Artical({
            ...req.body,
            Owner: req.user._id
        });
        await artical.save()
        res.status(201).send(artical)
    } catch (e) {
        res.status(400).send(e)
    }
})

// comment on artical
router.post('/articals/:id/comment', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        
        const artical = await Artical.findOne({_id})
        if (!artical) {
            return res.status(404).send();
        }
        
        /*const comment = {
            'comment': "testing ",
            'userId': req.user._id
        };
         console.log(comment) */
         console.log(artical) 
        //artical.Comments = artical.Comments.push(comment);
         artical.Comments.push( {...req.body,userId : req.user._id});
        await artical.save()
        res.status(201).send(artical)
    } catch (e) {
        res.status(400).send(e.message)
    }
})



module.exports = router;