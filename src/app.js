const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')

const userRouter = require('./routers/user')
const topicRouter = require('./routers/topic')
const articalRouter = require('./routers/artical')

const app = express();

app.use(express.json())

app.use(userRouter);
app.use(topicRouter);
app.use(articalRouter);

module.exports = app
