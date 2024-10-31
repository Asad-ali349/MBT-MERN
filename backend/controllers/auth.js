import Users from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SendEmail from '../Helper/email.js';
import { addUserSchema, loginSchema } from "../Validations/index.js";
import cloudinary from 'cloudinary';


export const Signin = async (req, res)=>{
    const {email,password} = req.body;
    try{
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user=await Users.findOne({email});
      if(!user)
          return res.status(404).json({message:"User Not found"});
      if(user.role!=='user')
          return res.status(404).json({message:"Invalid Role"});
      
      const passwordMatched =await bcrypt.compare(password,user.password);
      if(!passwordMatched)
          return res.status(404).json({message: "Incorrrect Password"})

      const token= jwt.sign(
          {
              id:user._id,
              email:user.email,
              role:user.role
          },
          "Signin",
          {
              expiresIn: "3d"
          }
      );
      
      return res.status(200).json({message:"Signin Successfully...",token,role:user.role})

    }catch(error){
      console.log(error)
        return res.status(500).json({message:error})
    }
};
export const AdminSignin = async (req, res)=>{
    const {email,password} = req.body;
    try{
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user=await Users.findOne({email});
      if(!user)
          return res.status(404).json({message:"User Not found"});
        
      if(user.role!=='admin')
        return res.status(404).json({message:"Only Admin is allowed to access this portal"});

      const passwordMatched =await bcrypt.compare(password,user.password);
      if(!passwordMatched)
          return res.status(404).json({message: "Incorrrect Password"})

      const token= jwt.sign(
          {
              id:user._id,
              email:user.email,
              role:user.role
          },
          "Signin",
          {
              expiresIn: "3d"
          }
      );
      
      return res.status(200).json({message:"Signin Successfully...",token,role:user.role})

    }catch(error){
      console.log(error)
        return res.status(500).json({message:error})
    }
};

export const Signup= async (req, res)=>{   
    
  const {email,password}=req.body;
  const user=req.body;
  try{
      const { error } = addUserSchema.validate(req.body);

      if (error) {
          return res.status(400).json({ message: error.details[0].message });
      }
     
      const existingUser= await Users.findOne({email});
      if (existingUser)
          return res.status(400).json({ message:"User already exits..."});

      if(req.file){
          if (req.file || Object.keys(req.file).length !== 0){
              const file = req.file; 
              // uploading image to cloudnary
              try{

                  await cloudinary.v2.uploader.upload(file.path, { folder: "Mithu_Users", resource_type: 'raw' }, async (err, result) => {
                      if(err) throw err;
                      removeTmp(file.path)
                      user.profile_image= { public_id: result.public_id, url: result.secure_url }
                  })
              }catch(error){
                  console.log(error)
              }
          }
      }
      // const password=generatePassword(8)
      const hashPassword = await bcrypt.hash(password, 10);
      const NewUser= new Users({...user,password:hashPassword});
      const savedUser = await NewUser.save();

      // Check if the user was successfully added
      if (savedUser) {
          let message=`<p>Your Account has Created Successfully. Your Credentials for login are: <br> <b>Email</b>: ${email} <br> <b>Password</b>: ${password}</p>`

          SendEmail(email,"Account Creation",message);
          const token= jwt.sign(
            {
                id:savedUser._id,
                email:savedUser.email,
                role:savedUser.role
            },
            "Signin",
            {
                expiresIn: "3d"
            }
        );
        // Return a 200 status with a success message
        return res.status(200).json({ message: 'User Created Successfully.',token,role:savedUser.role });
      } else {
        // If for some reason the user was not saved, return a 500 status
        return res.status(500).json({ message: "Unable to add User." });
      }

  }catch(error){
      // If an error occurs during the process, return a 500 status with the error message
      console.error('Error creating user:', error);
      return res.status(500).json({ message: error });
  }
}

export const ForgotPassword = async (req, res) => {
  
    const { email } = req.body;
    try {
      const existingUser = await Users.findOne({ email });
      if (!existingUser)
        return res.status(201).json({ message: "invalid Email..." });

      const token = randomString(10);
      await Users.findByIdAndUpdate(
        existingUser._id,
        { resetToken: token },
        {
          new: true,
        }
      );

        let message=`<html>
                    <body>
                    <p>Click on the reset passward link to change your password</p>
                    <a href="${process.env.CLIENT_URL}/reset_password/${token}">${process.env.CLIENT_URL}/reset-password/${token}</a>
                    </body>
                    </html>`
        
      SendEmail(message);


      
      res.status(200).json({ message: "Please Check your email" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
export const UserForgotPassword = async (req, res) => {
  
    const { email } = req.body;
    try {
      const existingUser = await Users.findOne({ email });
      if (!existingUser)
        return res.status(201).json({ message: "invalid Email..." });
      
      const otp = Math.floor(1000 + Math.random() * 9000);


      const token = randomString(10);
      await Users.findByIdAndUpdate(
        existingUser._id,
        { resetToken: token },
        {
          new: true,
        }
      );

        let message=`<html>
                    <body>
                    <p>Hi ${existingUser.name}, Your Request of Forgot Password has received. Place the Otp to procced</p>
                    <h3>OPT: ${otp}</h3>
                    </body>
                    </html>`
                    console.log(message)
        
      SendEmail(existingUser.email,"Forgot Password",message);


      res.status(404).json({ message: "OTP sent to your email", resetToken:token,otp });
      
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const getToken = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Users.findOne({ resetToken: id });
      res.status(200).json({ data });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const ResetPassword = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;
    try {
      const existingUser = await Users.findOne({ resetToken:token });
      if (!existingUser)
        return res.status(404).json({ message: "Invalid Token" });
  
      const hashPassword = await bcrypt.hash(password, 10);
      const data = await Users.findByIdAndUpdate(
        existingUser._id,
        { resetToken:null,
          password: hashPassword },
        {
          new: true,
        }
      );
      res.status(200).json({error:false,message:"Password Changed Successfully"});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  function randomString(length) {
    var result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
