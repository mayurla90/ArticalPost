const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')

const userRouter = require('./routes/user')
const topicRouter = require('./routes/topic')
const articalRouter = require('./routes/artical')

const app = express();

app.use(express.json())

app.use(userRouter);
app.use(topicRouter);
app.use(articalRouter);

module.exports = app
