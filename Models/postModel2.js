const mongoose = require("mongoose");

const postschema = new mongoose.Schema({

    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    },

    imgURL:{
        type:String,
        required: true
    } ,

    File:{
        type: String,
      },
    like:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"like"
    }],
    comment:[{
        type: mongoose.Schema.Types.ObjectId,  
        ref:'comment'
    }]
})
module.exports= mongoose.model("post",postschema)