const jwt = require("jsonwebtoken")


exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        }); 
      }
}



exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.role!=="admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only",
            });
           
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,please try again"
        })
    }
}

