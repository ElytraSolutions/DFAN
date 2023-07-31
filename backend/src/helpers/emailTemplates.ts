type Template = (...args: any[]) => { subject: string, text: string, html: string; };
const templates: { [key: string]: Template; } = {
    codeTemplate: (code: string, redirectURL: string) => {
        return {
            subject: 'Registration Code',
            html: `
                <div>
                    <h1>Thank you for registering!</h1>
                    <p>Your registration code is: <strong>${code}</strong></p>
                    <p>Please use this code to complete your registration or click on <a href="${redirectURL}">this link</a></p>
                </div>
            `,
            text: `Your registration code is: ${code}. Please use this code to complete your registration or visit ${redirectURL}`,
        };
    }
};
export default templates;
