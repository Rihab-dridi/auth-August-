//create server
const express=require('express')
const app=express()
const port=5000
const cors=require('cors')


//connect the DB 
require('dotenv').config()
const connectDB=require('./config/connectDB')
connectDB()


//middlewares
app.use(express.json())
app.use(cors())

//routes 
app.use('/api/user', require('./routes/user'))













app.listen(port, (err)=>{
err? console.log(err): console.log(`the server is running on ${port}...`)
})
