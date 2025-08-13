require('dotenv').config()
const express = require('express')
const indexroutes = require('./routes/index.routes')
const authroutes = require('./routes/auth.routes')
const cookieparser = require('cookie-parser')

const app = express()

app.set("view engine" , "ejs") //setup the ejs
app.use(express.static('public')) // display the css and js files for use this line 

app.use(express.json())
app.use(express.urlencoded(({extended:true})))
app.use(cookieparser())

app.use("/",indexroutes);
app.use('/auth',authroutes);


module.exports = app