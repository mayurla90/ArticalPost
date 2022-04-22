
const mongoose = require('mongoose')
const validator = require('validator')


const topicSchema= mongoose.Schema({
    name: {
        type: String,
        trim:true,     
        required: true
    }
 })

 topicSchema.virtual('articals', {
    ref: 'Articals',
    localField: '_id',
    foreignField: 'TopicId'
  }) 

const Topic = mongoose.model('Topics',topicSchema)

  module.exports = Topic