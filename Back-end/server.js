const express = require('express');
require('dotenv').config();
const app = express();
const PostRouter =require('./Routes/PostRoutes')
const AccountRouters = require('./Routes/AccountRoutes')



app.use(express.json());
app.use('/account',AccountRouters)
app.use('/posts', PostRouter)


app.listen(process.env.PORT || '3000' , ()=>{
  console.log(`server running on port : ${process.env.PORT}`)
});

module.exports = app; 