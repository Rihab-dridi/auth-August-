//create server
const express=require('express')
const app=express()
const port=5000


//connect the DB 
require('dotenv').config()
const connectDB=require('./config/connectDB')
connectDB()

//middlewares
app.use(express.json())

//routes 
app.use('/api/user', require('./routes/user'))













app.listen(port, (err)=>{
err? console.log(err): console.log(`the server is running on ${port}...`)
})
