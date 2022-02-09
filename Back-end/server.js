const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const PostRouter =require('./Routes/PostRoutes');
const AccountRouters =require('./Routes/AccountRoutes');
const NotificationRouters =require('./Routes/NotificationRoutes');
// app.use(express.json());

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true}));

const cors = require("cors")
app.use(cors());

app.use('/posts', PostRouter);
app.use('/account', AccountRouters)
// app.use('/notifications', NotificationRouters)


app.listen(process.env.PORT || '3000' , ()=>{
  console.log(`server running on port : ${process.env.PORT}`);
});

module.exports = app; 