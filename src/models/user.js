const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
//const Task = require('./task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('email is not valid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],  
  following: [{
    userId:{
      type: mongoose.Schema.Types.ObjectId,           
      ref: 'User',
      unique: true,
    }
  }]
}, {
  timestamps: true
}
);

userSchema.virtual('articals', {
  ref: 'Articals',
  localField: '_id',
  foreignField: 'Owner'
}) 


userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisnewcourse')
  user.tokens = user.tokens.concat({token});
  await user.save()
  return token
}
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('unable to login');
  }
  return user;
}

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

/*userSchema.pre('remove',async function (next) {
  const user = this
  await Task.deleteMany({Owner: user._id})
  next()
}) */

const User = mongoose.model('User', userSchema)

module.exports = User