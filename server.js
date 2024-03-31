const express = require("express");
const app = express();


require("dotenv").config();
app.use(express.json());
const PORT =  process.env.PORT || 4000;


const myRoute = require("./Routing/Route")
app.use('/api/v2', myRoute);

const fileupload = require("express-fileupload");
app.use(fileupload());

app.get('/', (req,res) => {
    res.send("Jai Shree Ram 108")
})

const mydb = require("./Config/Database");
 mydb();

const cloudinarydb = require("./Config/Cloudinary");
cloudinarydb.cloudConnect();

 app.listen(PORT , ()=>{
     console.log(`Server is running on port ${PORT}`)
 })