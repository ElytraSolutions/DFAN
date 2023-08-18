import fs from 'fs';

type Template = (...args: any[]) => {
    subject: string;
    text: string;
    html: string;
};
const templates: { [key: string]: Template } = {
    inviteAdminTemplate: ({
        name,
        role,
        password,
        url,
    }: {
        name: string;
        role: string;
        password: string;
        url: string;
    }) => {
        const template = fs.readFileSync('./src/helpers/inviteAdminEmail.html');
        const preparedTemplate = template
            .toString()
            .replace('{{url}}', url)
            .replace('{{password}}', password)
            .replace('{{name}}', name)
            .replace('{{role}}', role);
        return {
            subject: 'Invitation to join the DFAN admin team',
            text: `You have been invited to join the DFAN admin team. Your temporary password is: ${password}`,
            html: preparedTemplate,
        };
    },
    codeTemplate: (code: string, redirectURL: string) => {
        const template = fs.readFileSync(
            './src/helpers/registrationCodeEmail.html',
        );
        const preparedTemplate = template
            .toString()
            .replace('{{code}}', code)
            .replace('{{redirectURL}}', redirectURL);
        return {
            subject: 'Registration Code',
            html: preparedTemplate,
            text: `Your registration code is: ${code}. Please use this code to complete your registration or visit ${redirectURL}`,
        };
    },
};
export default templates;
