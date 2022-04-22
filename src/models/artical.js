
const mongoose = require('mongoose')
const validator = require('validator')


const articalSchema= mongoose.Schema({
    name: {
        type: String,
        trim:true,     
        required: true
    },
    Description: {
        type: String,
        trim:true,     
        required: true
    },
    TopicId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Topic'
      } ,
    Owner:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
     Comments: [{
        comment: {
          type: String         
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,           
            ref: 'User'
          }
      }],   
  },{
    timestamps: true
  })


const Artical = mongoose.model('Articals',articalSchema)

  module.exports = Artical