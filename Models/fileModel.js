const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgURL:{
        type:String,
        required: true
    },
    tags:{
        type: String
    },
    email:{
        type:String
    },
    File:{
      type: String,
    }
})

module.exports = mongoose.model("fileModel",uploadSchema);