import nodemailer from "nodemailer";
const SendEmail = (email,subject,message)=>{
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_Password,
            },
        });

        
        
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });
        
        transporter.sendMail(
            {
                from: `'No Reply' <${process.env.EMAIL_USERNAME}>`,
                to: email,
                subject: subject,
                html: message,
            },
            (error, info) => {
                if (error) {
                    throw error;
                }
            }
        );
    }catch(error){
        console.log(error);
        return error;
    }
}


export default SendEmail;