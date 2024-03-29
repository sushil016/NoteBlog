const express = require("express");
const app = express();


require("dotenv").config();
app.use(express.json());
const PORT =  process.env.PORT || 4000;


const myRoute = require("./Routing/Route")
app.use('/api/v2', myRoute);


app.get('/', (req,res) => {
    res.send("Jai Shree Ram 1")
})

const mydb = require("./Config/Database");
 mydb();

 app.listen(PORT , ()=>{
     console.log(`Server is running on port ${PORT}`)
 })