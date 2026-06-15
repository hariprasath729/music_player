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
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 0;">

<table width="400" cellpadding="0" cellspacing="0"
style="background:#1c1c1c;border-radius:12px;padding:30px;color:white;">

<tr>
<td align="center">
<img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player"/>
<h2 style="margin:10px 0;">Music Player</h2>
<p style="color:#aaa;">Login Verification</p>
</td>
</tr>

<tr>
<td align="center" style="padding:20px 0;">
<div style="background:#0f0f0f;padding:20px;border-radius:8px;">
<p style="margin:0;color:#bbb;">Your OTP</p>
<h1 style="letter-spacing:6px;color:#ff0000;">${otp}</h1>
</div>
</td>
</tr>

<tr>
<td align="center">
<p style="color:#888;font-size:13px;">Valid for 5 minutes</p>
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
<body style="margin:0;padding:0;background:#0f0f0f;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 0;">

<table width="420" cellpadding="0" cellspacing="0"
style="background:#1c1c1c;border-radius:12px;padding:30px;color:white;">

<tr>
<td align="center">
<img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player"/>
<h2 style="margin:10px 0;">Music Player</h2>
<p style="color:#aaa;">New Access Request</p>
</td>
</tr>

<tr>
<td style="padding:20px 0;">
<div style="background:#0f0f0f;padding:15px;border-radius:8px;">
<p style="color:#bbb;margin:0;">Name</p>
<p style="margin:5px 0 10px;font-weight:bold;">${userName}</p>

<p style="color:#bbb;margin:0;">Email</p>
<p style="margin:5px 0;font-weight:bold;">${userEmail}</p>
</div>
</td>
</tr>

<tr>
<td align="center" style="padding:20px 0;">

<a href="${approveLink}" 
style="display:inline-block;padding:12px 20px;margin-right:10px;background:#ff0000;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">
Approve
</a>

<a href="${rejectLink}" 
style="display:inline-block;padding:12px 20px;background:#3e3e3e;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">
Reject
</a>

</td>
</tr>

<tr>
<td align="center">
<p style="color:#888;font-size:13px;">Valid for 10 minutes</p>
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
  const appUrl = process.env.APP_URL || 'https://music-player-z1db.onrender.com';
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 0;">

<table width="400" cellpadding="0" cellspacing="0" style="background:#1c1c1c;border-radius:12px;padding:30px;color:white;text-align:center;">

<tr>
<td align="center">
<img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player"/>
<h2 style="margin:10px 0;">Music Player</h2>
<p style="color:#aaa;">Account Status</p>
</td>
</tr>

<tr>
<td style="padding-top:20px;">
<h2 style="color:#ff0000;margin-top:0;">✅ Access Approved</h2>

<p style="color:#bbb;margin-top:20px;">Hi <b>${name}</b>,</p>
<p style="color:#bbb;">Your request has been approved. You can now access the app.</p>

<a href="${appUrl}"
style="display:inline-block;margin-top:20px;padding:12px 20px;background:#ff0000;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">
Go to App </a>

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
  const appUrl = process.env.APP_URL || 'https://music-player-z1db.onrender.com';
  const contactLink = `${appUrl}/?contact=true&email=${encodeURIComponent(to)}&name=${encodeURIComponent(name)}`;
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 0;">

<table width="400" cellpadding="0" cellspacing="0" style="background:#1c1c1c;border-radius:12px;padding:30px;color:white;text-align:center;">

<tr>
<td align="center">
<img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player"/>
<h2 style="margin:10px 0;">Music Player</h2>
<p style="color:#aaa;">Account Status</p>
</td>
</tr>

<tr>
<td style="padding-top:20px;">
<h2 style="color:#ff0000;margin-top:0;">❌ Access Denied</h2>

<p style="color:#bbb;margin-top:20px;">Hi <b>${name}</b>,</p>
<p style="color:#bbb;">Your access request was not approved.</p>

<p style="color:#888;font-size:13px;margin-top:20px;">If you think this is a mistake, you can contact the admin.</p>

<a href="${contactLink}"
style="display:inline-block;margin-top:10px;padding:12px 20px;background:#3e3e3e;color:white;text-decoration:none;border-radius:6px;font-weight:bold;">
Contact Admin </a>

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
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" bgcolor="#0f0f0f" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 0;">

<table width="420" cellpadding="0" cellspacing="0" style="background:#1c1c1c;border-radius:12px;padding:30px;color:white;text-align:left;">

<tr>
<td align="center">
<img src="https://cdn.jsdelivr.net/gh/ritcv12345678-source/artists@main/logo.png" width="60" alt="Music Player"/>
<h2 style="margin:10px 0;">Music Player</h2>
<p style="color:#aaa;">Admin Support Message</p>
</td>
</tr>

<tr>
<td style="padding:20px 0;">
<div style="background:#0f0f0f;padding:15px;border-radius:8px;">
<p style="color:#bbb;margin:0;">From</p>
<p style="margin:5px 0 10px;font-weight:bold;">${userName} (${userEmail})</p>

<p style="color:#bbb;margin:0;">Message</p>
<p style="margin:5px 0;white-space:pre-wrap;color:#fff;">${message}</p>
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