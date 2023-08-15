const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const sendgrid = require('@sendgrid/mail');

const sendEmail = async (options) => {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');
    const template = fs.readFileSync(
        path.resolve(__dirname, `../../email_template/${options.templateName}.html`),
        "utf-8"
    );

    const html = ejs.render(template, options.templateVariables);
    console.log(`Email sent to ${options.email}`);
    const msg = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        html: html,

    };
    try {
        await sendgrid.send(msg);
        // console.log(`Email sent to ${options.email}`);
    } catch (error) {
        console.error(error);
    }

};

module.exports = sendEmail;