const fileModel= require("../Models/fileModel");


exports.fileUpload = async (req, res) => {

    try {

        const user = {name , email, tags} = req.body;

        console.log("userdetails:", user)


        const file = req.files.file;
        console.log("file aya =>", file);
        if (!file) {
            return res.status(400).json({
                success:false,
                message: "file dedoo jee"
            })
        }
        let path = __dirname + "./imgFiles/"  + Date.now();  + `.${file.name.split('.')[1]}`;

        console.log("path" ,path);
         await file.mv(path , (error)=>{
            console.log(error);
        })
        // console.log("path is =>", path);

        res.json({
            success : true,
            message: "file has been uploaddd successfully!"
        })

    } catch (error) {
        res.status(500).json({message: error.message,
        success:false,
        
    });
        
    }
}