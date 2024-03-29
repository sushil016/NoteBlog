  const userSignup = require("../Models/myfile");
  const jwt  = require('jsonwebtoken');
  const bcrypt = require('bcrypt') ;

  require("dotenv").config()

  exports.signup = async(req,res)=>{
           try{
            const {email,password,role} = req.body;

            const exitUser = await userSignup.findOne({email})

            if (exitUser)
                return res.status(500).json({
                    success : false,
                    massage:"Email is already exist"
                });


                let hashedPassword;
                try{
                  hashedPassword = await bcrypt.hash(password,10);
                }
                catch(err) {
                  return res.status(500).json({
                    success: false,
                    message: "Server Error!"
                  })
                }

                let newUser = await userSignup.create({
                    email,
                    password : hashedPassword ,
                    role
                }) 
                return res.status(200).json({
                    success:true,
                    message: "User ban Gya jee",
                    data:userSignup
                })
           }
           catch(error){()=> {console.log('Error In SignUp',error)}
            }
               
           

     };

     exports.logins =  async (req,res) => {
      try {
        const  {email,password} = req.body;
        if (!email || !password) {
          res.status(400).json({
              success:false,
              message: 'please fill  all fields'
           })
          };

        let newUser = await userSignup.findOne({email})
        console.log(newUser)
        if (!newUser) {
          return res.status(400).json({
              success:false,
              message:"please signup firstly"
            }) 
       };
        
       let payload ={
        email:newUser.email,
        id:newUser._id,
        role: newUser.role
       }


        if (await bcrypt.compare(password,newUser.password)) {
             let token = jwt.sign(payload,process.env.JWT_SECRET,{
              expiresIn : "2h",
             });
            

            newUser = newUser.toObject();
            newUser.token = token;
            console.log(newUser);
            newUser.password = undefined;
           
            const option = {
              expires : new Date(Date.now()+1 * 24 * 60 *60 * 1000),
              httpOnly : true
            }

            res.cookie("userToken", token,option).status(200).json({
                success:true,
                newUser,
                token,
                message: 'User logged in Successfully'
            })
 

        }
        else{
          console.log('Error In Comparing Password');
              return res.status(500).json({
                success: false,
                 message:'pasasword does not match'
         });
        }
         


      } catch (error) { 
        console.log(error);
         return res.status(500).json({
             success:false,
             message:"kuch gadbad hai"
         });
      }
};