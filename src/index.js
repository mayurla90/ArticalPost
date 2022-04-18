const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose')
const app = require('./app')


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('server is up and running at port ' + port)
})


