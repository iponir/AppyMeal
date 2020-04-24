const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const userRoute = require('./routes/user')
const stripeRoute = require('./routes/stripe')
const PORT = process.env.PORT || 3001
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(userRoute)
app.use(stripeRoute)

app.listen(PORT, function() {
    console.log("Node Server running on PORT:" + PORT)
})