import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false, // true for 465, false for other ports (uses STARTTLS)
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_KEY
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('📧 ❌ Brevo Transporter Error:', error.message);
  } else {
    console.log('📧 ✅ Nodemailer is securely connected to Brevo and ready to send emails!');
  }
});

const SENDER_EMAIL = `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const sendOtpEmail = async (to, otp) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  table { border-collapse: collapse; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  .container { width: 100% !important; max-width: 420px; margin: 0 auto; }
  @media screen and (max-width: 480px) {
    .container { max-width: 100% !important; }
    .content-pad { padding: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #0f0f0f;">
<tr>
<td align="center" style="padding:40px 20px;">
  <table class="container" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:420px; background:#1c1c1c; border-radius:12px; margin:0 auto;">
  <tr>
  <td class="content-pad" align="center" style="padding:30px; color:white;">
    <img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player" style="display:block; margin:0 auto;"/>
    <h2 style="margin:15px 0 5px 0; font-size: 24px;">Music Player</h2>
    <p style="color:#aaa; margin:0 0 20px 0; font-size: 16px;">Login Verification</p>
    <div style="background:#0f0f0f; padding:20px; border-radius:8px; margin-bottom: 20px;">
      <p style="margin:0 0 10px 0; color:#bbb; font-size: 14px;">Your OTP</p>
      <h1 style="margin:0; letter-spacing:6px; color:#ff0000; font-size: 32px;">${otp}</h1>
    </div>
    <p style="color:#888; font-size:13px; margin:0;">Valid for 5 minutes</p>
  </td>
  </tr>
  </table>
</td>
</tr>
</table>
</body>
</html>
  `;
  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject: 'Your Verification Code',
      html
    });
    console.log('📧 ✅ OTP Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Exception sending OTP email:', err);
  }
};

export const sendAdminApprovalEmail = async (userEmail, userName, token) => {
  const baseUrl = process.env.APP_URL || 'https://music-player-z1db.onrender.com';
  const approveLink = `${baseUrl}/api/auth/approve?token=${token}`;
  const rejectLink = `${baseUrl}/api/auth/reject?token=${token}`;
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  table { border-collapse: collapse; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  .container { width: 100% !important; max-width: 420px; margin: 0 auto; }
  @media screen and (max-width: 480px) {
    .container { max-width: 100% !important; }
    .content-pad { padding: 20px !important; }
    .btn-container { display: block !important; width: 100% !important; padding: 0 0 10px 0 !important; }
    .btn { display: block !important; width: 100% !important; box-sizing: border-box !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #0f0f0f;">
<tr>
<td align="center" style="padding:40px 20px;">
  <table class="container" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:420px; background:#1c1c1c; border-radius:12px; margin:0 auto;">
  <tr>
  <td class="content-pad" align="center" style="padding:30px; color:white;">
    <img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player" style="display:block; margin:0 auto;"/>
    <h2 style="margin:15px 0 5px 0; font-size: 24px;">Music Player</h2>
    <p style="color:#aaa; margin:0 0 20px 0; font-size: 16px;">New Access Request</p>
    <div style="background:#0f0f0f; padding:20px; border-radius:8px; margin-bottom: 25px; text-align: left;">
      <p style="color:#bbb; margin:0 0 5px 0; font-size: 14px;">Name</p>
      <p style="margin:0 0 15px 0; font-weight:bold; font-size: 16px; word-break: break-word;">${userName}</p>
      <p style="color:#bbb; margin:0 0 5px 0; font-size: 14px;">Email</p>
      <p style="margin:0; font-weight:bold; font-size: 16px; word-break: break-all;">${userEmail}</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
      <tr>
        <td class="btn-container" align="center" style="padding: 0 5px 0 0; width: 50%;">
          <a href="${approveLink}" class="btn" style="display:block; padding:14px 20px; background:#ff0000; color:white; text-decoration:none; border-radius:6px; font-weight:bold; font-size: 16px; text-align:center;">Approve</a>
        </td>
        <td class="btn-container" align="center" style="padding: 0 0 0 5px; width: 50%;">
          <a href="${rejectLink}" class="btn" style="display:block; padding:14px 20px; background:#3e3e3e; color:white; text-decoration:none; border-radius:6px; font-weight:bold; font-size: 16px; text-align:center;">Reject</a>
        </td>
      </tr>
    </table>
    <p style="color:#888; font-size:13px; margin:0;">Valid for 10 minutes</p>
  </td>
  </tr>
  </table>
</td>
</tr>
</table>
</body>
</html>
  `;
  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'Action Required: New User Approval',
      html
    });
    console.log('📧 ✅ Admin Approval Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Exception sending Admin Approval email:', err);
  }
};

export const sendApprovedNotificationEmail = async (to, name) => {
  const appUrl = process.env.FRONTEND_URL || 'https://music-player-psi-sepia.vercel.app';
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  table { border-collapse: collapse; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  .container { width: 100% !important; max-width: 420px; margin: 0 auto; }
  @media screen and (max-width: 480px) {
    .container { max-width: 100% !important; }
    .content-pad { padding: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #0f0f0f;">
<tr>
<td align="center" style="padding:40px 20px;">
  <table class="container" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:420px; background:#1c1c1c; border-radius:12px; margin:0 auto;">
  <tr>
  <td class="content-pad" align="center" style="padding:30px; color:white;">
    <img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player" style="display:block; margin:0 auto;"/>
    <h2 style="margin:15px 0 5px 0; font-size: 24px;">Music Player</h2>
    <p style="color:#aaa; margin:0 0 25px 0; font-size: 16px;">Account Status</p>
    <h2 style="color:#ff0000; margin:0 0 20px 0; font-size: 22px;">✅ Access Approved</h2>
    <p style="color:#bbb; margin:0 0 10px 0; font-size: 16px; line-height: 1.5;">Hi <b>${name}</b>,</p>
    <p style="color:#bbb; margin:0 0 25px 0; font-size: 16px; line-height: 1.5;">Your request has been approved. You can now access the app.</p>
    <a href="${appUrl}" style="display:inline-block; padding:14px 30px; background:#ff0000; color:white; text-decoration:none; border-radius:6px; font-weight:bold; font-size: 16px; text-align:center;">Go to App</a>
  </td>
  </tr>
  </table>
</td>
</tr>
</table>
</body>
</html>
  `;
  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject: 'Your Account is Approved',
      html
    });
    console.log('📧 ✅ Approved Notification Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Exception sending Approved Notification email:', err);
  }
};

export const sendRejectedNotificationEmail = async (to, name) => {
  const appUrl = process.env.FRONTEND_URL || 'https://music-player-psi-sepia.vercel.app';
  const contactLink = `${appUrl}/?contact=true&email=${encodeURIComponent(to)}&name=${encodeURIComponent(name)}`;
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  table { border-collapse: collapse; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  .container { width: 100% !important; max-width: 420px; margin: 0 auto; }
  @media screen and (max-width: 480px) {
    .container { max-width: 100% !important; }
    .content-pad { padding: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #0f0f0f;">
<tr>
<td align="center" style="padding:40px 20px;">
  <table class="container" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:420px; background:#1c1c1c; border-radius:12px; margin:0 auto;">
  <tr>
  <td class="content-pad" align="center" style="padding:30px; color:white;">
    <img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player" style="display:block; margin:0 auto;"/>
    <h2 style="margin:15px 0 5px 0; font-size: 24px;">Music Player</h2>
    <p style="color:#aaa; margin:0 0 25px 0; font-size: 16px;">Account Status</p>
    <h2 style="color:#ff0000; margin:0 0 20px 0; font-size: 22px;">❌ Access Denied</h2>
    <p style="color:#bbb; margin:0 0 10px 0; font-size: 16px; line-height: 1.5;">Hi <b>${name}</b>,</p>
    <p style="color:#bbb; margin:0 0 20px 0; font-size: 16px; line-height: 1.5;">Your access request was not approved.</p>
    <p style="color:#888; font-size:13px; margin:0 0 25px 0;">If you think this is a mistake, you can contact the admin.</p>
    <a href="${contactLink}" style="display:inline-block; padding:14px 30px; background:#3e3e3e; color:white; text-decoration:none; border-radius:6px; font-weight:bold; font-size: 16px; text-align:center;">Contact Admin</a>
  </td>
  </tr>
  </table>
</td>
</tr>
</table>
</body>
</html>
  `;
  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject: 'Update on Your Access Request',
      html
    });
    console.log('📧 ✅ Rejected Notification Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Exception sending Rejected Notification email:', err);
  }
};

export const sendMessageToAdminEmail = async (userEmail, userName, message) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  table { border-collapse: collapse; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  .container { width: 100% !important; max-width: 420px; margin: 0 auto; }
  @media screen and (max-width: 480px) {
    .container { max-width: 100% !important; }
    .content-pad { padding: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #0f0f0f;">
<tr>
<td align="center" style="padding:40px 20px;">
  <table class="container" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:420px; background:#1c1c1c; border-radius:12px; margin:0 auto;">
  <tr>
  <td class="content-pad" align="center" style="padding:30px; color:white;">
    <img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player" style="display:block; margin:0 auto;"/>
    <h2 style="margin:15px 0 5px 0; font-size: 24px; text-align: center;">Music Player</h2>
    <p style="color:#aaa; margin:0 0 25px 0; font-size: 16px; text-align: center;">Admin Support Message</p>
    <div style="background:#0f0f0f; padding:20px; border-radius:8px; text-align: left;">
      <p style="color:#bbb; margin:0 0 5px 0; font-size: 14px;">From</p>
      <p style="margin:0 0 15px 0; font-weight:bold; font-size: 16px; word-break: break-word;">${userName} (${userEmail})</p>
      <p style="color:#bbb; margin:0 0 5px 0; font-size: 14px;">Message</p>
      <p style="margin:0; white-space:pre-wrap; color:#fff; font-size: 16px; line-height: 1.5; word-break: break-word;">${message}</p>
    </div>
  </td>
  </tr>
  </table>
</td>
</tr>
</table>
</body>
</html>
  `;
  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Message from ${userName}`,
      html
    });
    console.log('📧 ✅ Admin Message Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Exception sending Admin Message email:', err);
  }
};

export const sendPasswordAccessEmail = async (to, name, magicLink, resetLink) => {
  // HTML template for Forgot Password + Magic Login
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; background-color: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  table { border-collapse: collapse; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  .container { width: 100% !important; max-width: 420px; margin: 0 auto; }
  @media screen and (max-width: 480px) {
    .container { max-width: 100% !important; }
    .content-pad { padding: 20px !important; }
    .btn-container { display: block !important; width: 100% !important; padding: 0 0 10px 0 !important; }
    .btn { display: block !important; width: 100% !important; box-sizing: border-box !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: #0f0f0f;">
<tr>
<td align="center" style="padding:40px 20px;">
  <table class="container" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:420px; background:#1c1c1c; border-radius:12px; margin:0 auto;">
  <tr>
  <td class="content-pad" align="center" style="padding:30px; color:white;">
    <img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player" style="display:block; margin:0 auto;"/>
    <h2 style="margin:15px 0 5px 0; font-size: 24px;">Music Player</h2>
    <p style="color:#aaa; margin:0 0 25px 0; font-size: 16px;">Reset your password or login instantly</p>

    <p style="color:#bbb; margin:0 0 10px 0; font-size: 16px; line-height:1.5;">Hi <b>${name}</b>,</p>
    <p style="color:#bbb; margin:0 0 25px 0; font-size: 16px; line-height:1.5;">
      Use the links below. They are valid for 15 minutes and can be used only once.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
      <tr>
        <td class="btn-container" align="center" style="padding: 0 5px 10px 0;">
          <a href="${magicLink}" class="btn" style="display:block; padding:14px 20px; background:#1db954; color:#0b0b0b; text-decoration:none; border-radius:6px; font-weight:bold; font-size: 16px; text-align:center;">
            Login instantly
          </a>
        </td>
      </tr>
      <tr>
        <td class="btn-container" align="center" style="padding: 0 5px 0 0;">
          <a href="${resetLink}" class="btn" style="display:block; padding:14px 20px; background:#ff0000; color:white; text-decoration:none; border-radius:6px; font-weight:bold; font-size: 16px; text-align:center;">
            Reset password
          </a>
        </td>
      </tr>
    </table>

    <p style="color:#888; font-size:13px; margin:20px 0 0 0;">
      If you didn’t request this, you can ignore this email.
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

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject: 'Reset your password or login instantly',
      html
    });
    console.log('📧 ✅ Password Access Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('❌ Exception sending Password Access email:', err);
  }
};
