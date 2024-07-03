const cloudinary = require("cloudinary").v2
require("dotenv").config();


    cloudinary.config({
        api_key: process.env.API_KEY,
        api_secret: process.env.SECRET_KEY,
        cloud_name: process.env.CLOUD_NAME
    })

    const uploadCloudinary = async(loaclPath) =>{
      try {
          if (!loaclPath) return null
          
          const result = await cloudinary.uploader.upload(loaclPath, {
              resource_type: "auto"
          });
          console.log(result.url);
          return result;
      } catch (error) {
          fs.unlinkSync(loaclPath);
          return null;
      }
  }
  
module.exports = uploadCloudinary