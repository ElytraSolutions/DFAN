import sgMail from '@sendgrid/mail';
import templates from './emailTemplates';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function sendMail(email: string, subject: string, text: string, html: string) {
    if (!process.env.SENDGRID_API_KEY || !process.env.FROM_EMAIL) {
        throw new Error('Sendgrid API key or from email not set!');
    }
    const resp = await sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject,
        text,
        html,
    });
    console.log(resp);
    return resp;
};

export default async function sendEmail(email: string, template: string, ...args: any[]) {
    if (Object.keys(templates).indexOf(template) === -1) {
        throw new Error('Invalid template!');
    }
    const { subject, text, html } = templates[template](...args);
    return await sendMail(email, subject, text, html);
}
