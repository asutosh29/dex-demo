import nodemailer from "nodemailer";
import { env } from "~/lib/env";

// Gmail enforces strict limits on the number of recipients you can email within a 24-hour period:
// Personal Gmail accounts: Up to 500 recipients per rolling 24-hour period * (Our plan rn)
// Google Workspace accounts: Up to 2,000 recipients per rolling 24-hour period

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GOOGLE_APP_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: `Dex ${env.GMAIL_USER}`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// ============================================
// TEMPLATE 1: WAITLIST CONFIRMATION
// ============================================

export const waitlistEmailTemplate = (name: string, email: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You're on the list, ${name}!</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f4;">
    <tr>
      <td align="center" style="padding: 48px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 440px; background-color: #141414; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);">
          
          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 600; color: #ffffff; text-align: center; letter-spacing: -0.5px;">
                You're on the list, ${name}!
              </h1>
              <p style="margin: 0; font-size: 16px; color: #9a9a9a; text-align: center; line-height: 1.6;">
                We'll email you at <span style="color: #d4d4d4;">${email}</span> when your spot is ready.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #0f0f0f; border-top: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0; font-size: 13px; color: #6a6a6a; text-align: center;">
                © 2026 Dex
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ============================================
// TEMPLATE 2: WAITLIST APPROVED
// ============================================

export const approvedEmailTemplate = (name: string, _email: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You're in, ${name}!</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f4;">
    <tr>
      <td align="center" style="padding: 48px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 440px; background-color: #141414; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);">
          
          <!-- Success Badge -->
          <tr>
            <td align="center" style="padding: 48px 40px 16px;">
              <div style="display: inline-block; padding: 6px 14px; background-color: rgba(74, 222, 128, 0.15); border-radius: 100px;">
                <span style="font-size: 13px; font-weight: 600; color: #4ade80;">
                  ✓ Approved
                </span>
              </div>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 0 40px 28px;">
              <h1 style="margin: 0 0 12px; font-size: 28px; font-weight: 600; color: #ffffff; text-align: center; letter-spacing: -0.5px;">
                You're in, ${name}!
              </h1>
              <p style="margin: 0; font-size: 16px; color: #9a9a9a; text-align: center; line-height: 1.5;">
                Your second brain is ready.
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 32px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://dex.sdslabs.co/login" style="height:44px;v-text-anchor:middle;width:160px;" arcsize="20%" stroke="f" fillcolor="#ffffff">
                <w:anchorlock/>
                <center style="color:#0c0c0c;font-family:sans-serif;font-size:14px;font-weight:bold;">Sign in to Dex</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="https://dex.sdslabs.co/login" 
                 style="display: inline-block; padding: 12px 28px; background-color: #ffffff; color: #0c0c0c; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">
                Sign in to Dex
              </a>
              <!--<![endif]-->
            </td>
          </tr>
          
          <!-- Quick Tips -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1c1c1c; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; color: #7a7a7a; text-transform: uppercase; letter-spacing: 0.8px;">
                      Quick start
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 5px 0; font-size: 14px;">
                          <span style="color: #5a5a5a; margin-right: 10px;">1.</span>
                          <span style="color: #b0b0b0;">Create your first collection</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 14px;">
                          <span style="color: #5a5a5a; margin-right: 10px;">2.</span>
                          <span style="color: #b0b0b0;">Install the Chrome extension</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0; font-size: 14px;">
                          <span style="color: #5a5a5a; margin-right: 10px;">3.</span>
                          <span style="color: #b0b0b0;">Save your first link</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #0f0f0f; border-top: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0; font-size: 13px; color: #6a6a6a; text-align: center;">
                © 2026 Dex
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function sendWaitlistConfirmationEmail(
  name: string,
  email: string,
) {
  const firstName = name.split(" ")[0];
  const subject = `You're on the Dex waitlist, ${firstName}!`;
  const html = waitlistEmailTemplate(firstName, email);
  await sendEmail(email, subject, html);
}

export async function sendWaitlistApprovedEmail(name: string, email: string) {
  const firstName = name.split(" ")[0];
  const subject = `You're in, ${firstName}! Welcome to Dex.`;
  const html = approvedEmailTemplate(firstName, email);
  await sendEmail(email, subject, html);
}
