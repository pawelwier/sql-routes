const express = require('express')

const {crudMiddleware} = require('./middleware/crudMiddleware')

const app = express()

app.use(express.json())

app.use(crudMiddleware)

app.listen(2000)
