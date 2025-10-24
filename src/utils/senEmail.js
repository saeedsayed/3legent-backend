import nodemailer from "nodemailer"
const sendEmail = async ({ to, subject, ...rest }) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to,
            subject,
            ...rest
        });
    } catch (err) {
        console.log("Error sending email:", err);
    }
}

export default sendEmail;