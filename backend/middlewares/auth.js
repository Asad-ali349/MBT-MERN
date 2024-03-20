import jwt from 'jsonwebtoken';



const auth= async (req,res,next)=>{
    try{
        const authorization=req.headers.authorization;
        if(!authorization){
            return res.status(401).json({
                message: "Unauthorized User"
            });
        }
 
        let DecodedData= jwt.verify(authorization,"Signin");
        req.user_id=DecodedData?.id;
        next();
        
    }catch(error){  
        console.log(error);
        return res.status(401).json({
            message: "Unauthorized User"
        });
    }
}

export default auth;