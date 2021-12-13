import express from "express";
import mongodb = require('mongodb');
import mongoose from 'mongoose';

// Connect URL + db
const url = 'mongodb://127.0.0.1:27017/test';

// TODO: figure out if this is appropiate
// TODO: fix this for use with nodemon
//global.secret = "udmen3kdfov8n4d6h0kogkm3c469j0torjg3flno6957dfgfh044";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
const port = 3005;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS" )
  next();
});

// Connect to MongoDB
mongoose.connect(url, {}, (err) => {
    
  if (err) {
      console.log(err);
  } else {
    console.log(`MongoDB Connected: ${url}`);
  }
  
});

app.get('/', (req, res) => {
    res.send(`This is the neurone-auth backend on port ${port}!`);
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

app.use("/auth/", require('./routes/auth') );