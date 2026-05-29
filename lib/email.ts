export function generateThankYouEmail({
  orderId,
  paymentId,
  productName,
  downloadUrl,
  currency = 'USD',
  amount = '49.00',
  autoDownload = true,
}: {
  orderId: string;
  paymentId: string;
  productName: string;
  downloadUrl: string;
  currency?: string;
  amount?: string;
  autoDownload?: boolean;
}) {
  const accessHeading = autoDownload
    ? 'Access Your Purchase'
    : 'Open Your Project';
  const accessMessage = autoDownload
    ? 'Your purchase is ready for download. Click the button below to access your content immediately.'
    : 'Your project is ready to remix. Click the button below to open it in your browser.';
  const accessButtonLabel = autoDownload ? 'Download Now' : 'Open Project';
  const accessFooter = autoDownload
    ? 'This link will expire in 24 hours. For any questions, contact our support team.'
    : 'Keep this link safe. It grants access to your project. For any questions, contact our support team.';
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Purchase</title>
    <style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
    padding: 20px;
}

.email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.header {
    background-color: #e91e63;
    color: white;
    padding: 40px 30px;
    text-align: center;
}

.header h1 {
    font-size: 28px;
    margin-bottom: 10px;
    font-weight: 600;
}

.header p {
    font-size: 16px;
    opacity: 0.9;
}

.content {
    padding: 40px 30px;
}

.order-details {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 25px;
    margin-bottom: 30px;
    border-left: 3px solid #e91e63;
}

.order-details h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eeeeee;
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-label {
    font-weight: 600;
    color: #666;
    font-size: 14px;
}

.detail-value {
    font-weight: 500;
    color: #333;
    text-align: right;
}

.product-title {
    color: #e91e63;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.product-title:hover {
    color: #c2185b;
    text-decoration: underline;
}

.cost-highlight {
    font-size: 18px;
    font-weight: 700;
    color: #e91e63;
}

.message {
    background-color: #fdf2f8;
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 30px;
    border-left: 3px solid #f8bbd9;
}

.message p {
    color: #555;
    font-size: 15px;
    line-height: 1.5;
}

.footer {
    background-color: #fafafa;
    padding: 20px 30px;
    text-align: center;
    border-top: 1px solid #eeeeee;
}

.footer p {
    font-size: 12px;
    color: #888;
    font-style: italic;
}

.divider {
    height: 1px;
    background-color: #e91e63;
    margin: 20px 0;
}

.download-section {
    text-align: center;
    padding: 30px 20px;
    background-color: #fdf2f8;
    border-radius: 6px;
    margin-bottom: 30px;
}

.download-section h3 {
    color: #333;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
}

.download-section p {
    color: #555;
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.download-btn {
    display: inline-block;
    background-color: #e91e63;
    color: white;
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-bottom: 15px;
}

.download-btn:hover {
    background-color: #c2185b;
}

.support-text {
    font-size: 13px !important;
    color: #888 !important;
    margin-bottom: 0 !important;
}

@media (max-width: 600px) {
    body {
        padding: 10px;
    }
    
    .header {
        padding: 30px 20px;
    }
    
    .header h1 {
        font-size: 24px;
    }
    
    .content {
        padding: 30px 20px;
    }
    
    .order-details {
        padding: 20px;
    }
    
    .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .detail-value {
        text-align: left;
    }
}
</style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Thank You for Your Purchase!</h1>
            <p>Your order has been confirmed and is being processed</p>
        </div>
        
        <div class="content">
            <div class="message">
                <p>We're excited to let you know that your recent purchase has been successfully processed. Below are the details of your order for your records.</p>
            </div>
            
            <div class="order-details">
                <h2>Order Details</h2>
                
                <div class="detail-row">
                    <span class="detail-label">Order ID: </span>
                    <span class="detail-value">${orderId}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Payment ID: </span>
                    <span class="detail-value">${paymentId}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Product: </span>
                    <span class="detail-value">
                        <span class="product-title">${productName}</span>
                    </span>
                </div>
                
                <div class="divider"></div>
                
                <div class="detail-row">
                    <span class="detail-label">Total Cost: </span>
                    <span class="detail-value cost-highlight">${currencySymbol(currency)}${amount}</span>
                </div>
            </div>
            
            <div class="download-section">
                <h3>${accessHeading}</h3>
                <p>${accessMessage}</p>
                <a href="${downloadUrl}" class="download-btn">
                    ${accessButtonLabel}
                </a>
                <p class="support-text">${accessFooter}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Please don't share this download link to maintain content security</p>
        </div>
    </div>
</body>
</html>`;
}

function currencySymbol(currency: string) {
  const symbols: Record<string, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
  };
  return symbols[currency.toUpperCase()] || `${currency} `;
}

// ─── Contact form emails ──────────────────────────────────────────────────────

/** Escape user-supplied text before interpolating into email HTML. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const MVP_LOGO = 'https://i.postimg.cc/Bb5yKkFF/rose.webp';

export interface ContactMeta {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  device?: string;
  language?: string;
  languages?: string;
  timezone?: string;
  screen?: string;
  viewport?: string;
  referrer?: string;
  page?: string;
  submittedAt?: string;
}

/** Confirmation email sent to the person who submitted the contact form. */
export function generateContactConfirmationEmail({
  name,
  subject,
  message,
}: {
  name: string;
  subject?: string;
  message: string;
}) {
  const firstName = esc(name.split(' ')[0] || name);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Thanks for reaching out</title>
</head>
<body style="margin:0;padding:24px;background-color:#fdf2f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#3f3f46;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(233,30,99,0.10);">
    <div style="background:linear-gradient(135deg,#f43f5e,#e91e63);padding:36px 32px;text-align:center;">
      <img src="${MVP_LOGO}" width="48" height="48" alt="MVPBlocks" style="display:inline-block;margin-bottom:12px;" />
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Thanks for reaching out, ${firstName}! 👋</h1>
      <p style="margin:8px 0 0;color:#ffe4ec;font-size:15px;">We've received your message and will get back to you soon.</p>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#52525b;">
        Hi ${firstName}, thank you for getting in touch with the <strong style="color:#e91e63;">MVPBlocks</strong> team.
        A real human will review your message and reply to this email address shortly — usually within 1–2 business days.
      </p>

      <div style="background:#fdf2f6;border-left:3px solid #f43f5e;border-radius:8px;padding:18px 20px;margin-bottom:24px;">
        <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#9f1239;font-weight:700;">Your message${subject ? ` · ${esc(subject)}` : ''}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#3f3f46;white-space:pre-wrap;">${esc(message)}</p>
      </div>

      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#52525b;">
        In the meantime, feel free to explore the docs or star us on GitHub — it genuinely helps a ton. ⭐
      </p>

      <div style="text-align:center;margin-bottom:8px;">
        <a href="https://blocks.mvp-subha.me/docs/introduction" style="display:inline-block;background:linear-gradient(135deg,#f43f5e,#e91e63);color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 28px;border-radius:8px;">Browse the docs</a>
      </div>
    </div>

    <div style="background:#fafafa;padding:20px 32px;text-align:center;border-top:1px solid #f1f1f4;">
      <p style="margin:0;font-size:12px;color:#a1a1aa;">MVPBlocks · Ship beautiful MVPs faster</p>
      <p style="margin:6px 0 0;font-size:11px;color:#c4c4cc;">You're receiving this because you contacted us at blocks.mvp-subha.me</p>
    </div>
  </div>
</body>
</html>`;
}

/** Detailed notification email sent to the site admin. */
export function generateContactAdminEmail({
  name,
  email,
  subject,
  message,
  meta = {},
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  meta?: ContactMeta;
}) {
  const location =
    [meta.city, meta.region, meta.country].filter(Boolean).map(esc).join(', ') ||
    'Unknown';

  const rows: Array<[string, string]> = [
    ['IP address', esc(meta.ip || 'Unknown')],
    ['Location', location],
    ['Browser', esc(meta.browser || 'Unknown')],
    ['Operating system', esc(meta.os || 'Unknown')],
    ['Device', esc(meta.device || 'Unknown')],
    ['Timezone', esc(meta.timezone || 'Unknown')],
    ['Language', esc(meta.language || 'Unknown')],
    ['All languages', esc(meta.languages || 'Unknown')],
    ['Screen', esc(meta.screen || 'Unknown')],
    ['Viewport', esc(meta.viewport || 'Unknown')],
    ['Came from page', esc(meta.page || 'Unknown')],
    ['Referrer', esc(meta.referrer || 'Direct / none')],
    ['Submitted at', esc(meta.submittedAt || 'Unknown')],
    ['User agent', esc(meta.userAgent || 'Unknown')],
  ];

  const detailRows = rows
    .map(
      ([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? '#ffffff' : '#fafafa'};">
          <td style="padding:10px 16px;font-size:12px;font-weight:600;color:#71717a;width:38%;vertical-align:top;border-bottom:1px solid #f1f1f4;">${label}</td>
          <td style="padding:10px 16px;font-size:13px;color:#27272a;word-break:break-word;border-bottom:1px solid #f1f1f4;">${value}</td>
        </tr>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New contact form submission</title>
</head>
<body style="margin:0;padding:24px;background-color:#fdf2f6;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#3f3f46;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(233,30,99,0.10);">
    <div style="background:linear-gradient(135deg,#f43f5e,#e91e63);padding:32px;text-align:center;">
      <img src="${MVP_LOGO}" width="44" height="44" alt="MVPBlocks" style="display:inline-block;margin-bottom:10px;" />
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">📬 New contact submission</h1>
      <p style="margin:8px 0 0;color:#ffe4ec;font-size:14px;">Someone just reached out via the website</p>
    </div>

    <div style="padding:32px;">
      <!-- Sender -->
      <div style="background:#fdf2f6;border-radius:12px;padding:20px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;font-size:13px;font-weight:600;color:#9f1239;width:90px;">Name</td>
            <td style="padding:6px 0;font-size:14px;color:#27272a;">${esc(name)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;font-weight:600;color:#9f1239;">Email</td>
            <td style="padding:6px 0;font-size:14px;"><a href="mailto:${esc(email)}" style="color:#e91e63;text-decoration:none;">${esc(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;font-weight:600;color:#9f1239;">Subject</td>
            <td style="padding:6px 0;font-size:14px;color:#27272a;">${esc(subject || '—')}</td>
          </tr>
        </table>
      </div>

      <!-- Message -->
      <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#71717a;font-weight:700;">Message</p>
      <div style="background:#ffffff;border:1px solid #f1f1f4;border-left:3px solid #f43f5e;border-radius:8px;padding:18px 20px;margin-bottom:28px;font-size:14px;line-height:1.7;color:#3f3f46;white-space:pre-wrap;">${esc(message)}</div>

      <!-- Technical details -->
      <p style="margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#71717a;font-weight:700;">🔎 Sender details</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f1f1f4;border-radius:8px;overflow:hidden;">
        ${detailRows}
      </table>

      <div style="text-align:center;margin-top:28px;">
        <a href="mailto:${esc(email)}${subject ? `?subject=${encodeURIComponent('Re: ' + subject)}` : ''}" style="display:inline-block;background:linear-gradient(135deg,#f43f5e,#e91e63);color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 28px;border-radius:8px;">Reply to ${esc(name.split(' ')[0] || name)}</a>
      </div>
    </div>

    <div style="background:#fafafa;padding:18px 32px;text-align:center;border-top:1px solid #f1f1f4;">
      <p style="margin:0;font-size:11px;color:#a1a1aa;">Sent automatically from the MVPBlocks contact form</p>
    </div>
  </div>
</body>
</html>`;
}
