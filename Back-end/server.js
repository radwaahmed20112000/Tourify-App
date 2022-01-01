const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const PostRouter =require('./Routes/PostRoutes');
const AccountRouters =require('./Routes/AccountRoutes');
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require("cors")
app.use(cors());

app.use('/posts', PostRouter);
app.use('/account', AccountRouters)


app.listen(process.env.PORT || '3000' , ()=>{
  console.log(`server running on port : ${process.env.PORT}`);
});

module.exports = app; 