import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'ardilablancoangieyuliana@gmail.com', // generated ethereal user
      pass: 'tmpunhaktctfzqjo', // generated ethereal password
    },
  });

transporter.verify().then(()=>{
    console.log('Listo para enviar emails');
})

export default transporter