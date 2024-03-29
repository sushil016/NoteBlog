const mongoose = require("mongoose");

const likeschema = new mongoose.Schema({ 
    
        post : {
               type : mongoose.Schema.Types.ObjectId,
               ref:"post" 
         },

         user:{
              type:String,
              required:true
         },         
   }
)
module.exports = mongoose.model("like",likeschema);