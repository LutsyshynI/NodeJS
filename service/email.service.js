const path = require('path')
const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const {NO_REPLY_EMAIL,NO_REPLY_EMAIL_PASSWORD} = require("../config/config");
const emailTemplates = require('../email-templates');
const apiError = require('../error/ApiError');

const sendEmail = async (userEmail,emailActions) =>  {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const templateInfo = emailTemplates[emailActions]

    if (!templateInfo)  {
        throw new apiError('Wrong template',500)
    }

    const templateRenderer = new EmailTemplates({
        views: {
            root:path.join(process.cwd(),'email-templates')
        }
    })

     const html = await templateRenderer.render(templateInfo.templateName)

return transporter.sendMail({
    from:'No reply',
    to: userEmail ,
    subject: templateInfo.subject,
    html
})
}

module.exports = {
    sendEmail
}