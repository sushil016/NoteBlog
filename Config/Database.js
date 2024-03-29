const mongoose = require("mongoose");

require("dotenv").config();

const blogDatabase = function(){
    mongoose.connect(process.env.DATABASE_URL)

      .then(()=>{console.log("Database connect hogya")})
      .catch((error)=>{console.log("Error in db Connection")
      console.log(error.message)
      process.exit(1)
      });
}
module.exports = blogDatabase;