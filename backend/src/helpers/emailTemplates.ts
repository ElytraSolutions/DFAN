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
        return {
            subject: 'Invitation to join the DFAN admin team',
            text: `You have been invited to join the DFAN admin team. Your temporary password is: ${password}`,
            html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
                    />
                    <!--[if !mso]><!-->
                    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
                    <!--<![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG />
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <style type="text/css">
                        body {
                        width: 600px;
                        margin: 0 auto;
                        }
                        table {
                        border-collapse: collapse;
                        }
                        table,
                        td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        }
                        img {
                        -ms-interpolation-mode: bicubic;
                        }
                    </style>
                    <![endif]-->
                    <style type="text/css">
                    body,
                    p,
                    div {
                        font-family: inherit;
                        font-size: 14px;
                    }
                    body {
                        color: #000000;
                    }
                    body a {
                        color: #1188e6;
                        text-decoration: none;
                    }
                    p {
                        margin: 0;
                        padding: 0;
                    }
                    table.wrapper {
                        width: 100% !important;
                        table-layout: fixed;
                        -webkit-font-smoothing: antialiased;
                        -webkit-text-size-adjust: 100%;
                        -moz-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
                    img.max-width {
                        max-width: 100% !important;
                    }
                    .column.of-2 {
                        width: 50%;
                    }
                    .column.of-3 {
                        width: 33.333%;
                    }
                    .column.of-4 {
                        width: 25%;
                    }
                    ul ul ul ul {
                        list-style-type: disc !important;
                    }
                    ol ol {
                        list-style-type: lower-roman !important;
                    }
                    ol ol ol {
                        list-style-type: lower-latin !important;
                    }
                    ol ol ol ol {
                        list-style-type: decimal !important;
                    }
                    @media screen and (max-width: 480px) {
                        .preheader .rightColumnContent,
                        .footer .rightColumnContent {
                        text-align: left !important;
                        }
                        .preheader .rightColumnContent div,
                        .preheader .rightColumnContent span,
                        .footer .rightColumnContent div,
                        .footer .rightColumnContent span {
                        text-align: left !important;
                        }
                        .preheader .rightColumnContent,
                        .preheader .leftColumnContent {
                        font-size: 80% !important;
                        padding: 5px 0;
                        }
                        table.wrapper-mobile {
                        width: 100% !important;
                        table-layout: fixed;
                        }
                        img.max-width {
                        height: auto !important;
                        max-width: 100% !important;
                        }
                        a.bulletproof-button {
                        display: block !important;
                        width: auto !important;
                        font-size: 80%;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        }
                        .columns {
                        width: 100% !important;
                        }
                        .column {
                        display: block !important;
                        width: 100% !important;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        }
                        .social-icon-column {
                        display: inline-block !important;
                        }
                    }
                    </style>
                    <!--user entered Head Start-->
                    <link
                    href="https://fonts.googleapis.com/css?family=Fira+Sans+Condensed&display=swap"
                    rel="stylesheet"
                    />
                    <style>
                    body {
                        font-family: "Fira Sans Condensed", sans-serif;
                    }
                    </style>
                    <!--End Head user entered-->
                </head>
                <body>
                    <div class="webkit wrapper">
                    <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        align="center"
                        width="100%"
                        role="module"
                        data-type="columns"
                        style="padding: 30px 0px 30px 20px; background-color: #57714d"
                        data-distribution="1"
                    >
                        <tbody>
                        <tr role="module-content">
                            <td height="100%" valign="top" align="center">
                            <a
                                href="https://cdn.discordapp.com/attachments/660712765433839617/1141544213507473519/logo.png"
                                style="margin: 5px auto"
                            >
                                <img
                                class="max-width"
                                style="
                                    display: block;
                                    color: #000000;
                                    text-decoration: none;
                                    font-family: Helvetica, arial, sans-serif;
                                    font-size: 16px;
                                "
                                alt="DFAN Logo"
                                data-proportionally-constrained="true"
                                data-responsive="false"
                                src="https://cdn.discordapp.com/attachments/660712765433839617/1141544213507473519/logo.png"
                                width="322"
                                height="316"
                                border="0"
                            /></a>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                padding: 30px 30px 18px 30px;
                                line-height: 36px;
                                text-align: inherit;
                                background-color: #57714d;
                            "
                            role="module-content"
                            valign="top"
                            height="100%"
                            >
                            <div>
                                <div style="font-family: inherit; text-align: center">
                                <span
                                    style="
                                    color: #ffffff;
                                    font-size: 48px;
                                    font-family: inherit;
                                    "
                                    >Welcome, ${name}!</span
                                >
                                </div>
                                <div></div>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                padding: 18px 30px 18px 30px;
                                line-height: 22px;
                                text-align: inherit;
                                background-color: #57714d;
                            "
                            role="module-content"
                            valign="top"
                            height="100%"
                            >
                            <div>
                                <div style="font-family: inherit; text-align: inherit">
                                <span style="color: #ffffff; font-size: 15px"
                                    >You have been invited as ${role} for DFAN. Your password
                                    is:&nbsp;</span
                                >
                                </div>
                                <div style="font-family: inherit; text-align: inherit">
                                <span
                                    style="
                                    color: #ffffff;
                                    font-size: 15px;
                                    font-family: courier, monospace;
                                    "
                                    >${password}</span
                                >
                                </div>
                                <div style="font-family: inherit; text-align: inherit">
                                <span
                                    style="
                                    color: #ffffff;
                                    font-size: 15px;
                                    font-family: arial, helvetica, sans-serif;
                                    "
                                    >It is recommended to change your password on first
                                    login.</span
                                >
                                </div>
                                <div></div>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                            class="outer-td"
                            style="padding: 10px 0px 40px 0px; background-color: #57714d"
                            align="center"
                            >
                            <table
                                class="wrapper-mobile"
                                style="text-align: center"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    class="inner-td"
                                    style="
                                        border-radius: 6px;
                                        font-size: 16px;
                                        text-align: center;
                                        background-color: inherit;
                                    "
                                    bgcolor="#ffc94c"
                                    align="center"
                                    >
                                    <a
                                        href="${url}"
                                        style="
                                        background-color: #ffc94c;
                                        border: 1px solid #ffc94c;
                                        border-color: #ffc94c;
                                        border-radius: 40px;
                                        border-width: 1px;
                                        color: #3f4259;
                                        display: inline-block;
                                        font-size: 15px;
                                        font-weight: normal;
                                        letter-spacing: 0px;
                                        line-height: 25px;
                                        padding: 12px 18px 10px 18px;
                                        text-align: center;
                                        text-decoration: none;
                                        border-style: solid;
                                        font-family: inherit;
                                        width: 168px;
                                        "
                                        target="_blank"
                                        >Go to Admin Panel</a
                                    >
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </body>
                </html>

            `,
        };
    },
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
    },
};
export default templates;
