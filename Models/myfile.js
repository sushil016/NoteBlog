const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();


const SignupSchema = new  mongoose.Schema({
      
      email: {
        type: String,
        required: true,
        trim:true
      },

      password:{
       type: String,
       required :true,
       
      },

      role: {
        type: String,
        enum: ['user', 'admin'],
      }
})

SignupSchema.post("save", async function (body){
    try {

      console.log("BODY:",body)
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        auth:{
             user: process.env.MAIL_USERNAME ,
             pass: process.env.MAIL_PASSWORD,
        }   
        });

        let info = await transporter.sendMail({
          from:`NoteWrite`,
          to: body.email,
          subject:"you have signup in successfully",
          html: `<p>verify your email <a href="chick here ${process.env.PORT1}"></a> </p>`
        })
        console.log("info", info);


    } catch (error) {
      console.log(error);
    }

})

module.exports = mongoose.model("userSignup", SignupSchema)