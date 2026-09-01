/**
 * CryoCorp O2 LLP - Hub Client Logic
 * Handles permanent QR generation, vCard contact export, and high-res PNG download.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Exact Permanent Production URL for this Hub
  // When clients scan the printed QR code on a card/machine, they land on this Hub page!
  const HUB_PRODUCTION_URL = 'https://cryocorp-connect.vercel.app';

  // Update badge on page
  const badgeEl = document.getElementById('qr-target-url');
  if (badgeEl) {
    badgeEl.textContent = HUB_PRODUCTION_URL;
  }

  // 3. Generate the on-screen QR Code
  const qrContainer = document.getElementById('qrcode');
  if (qrContainer && typeof QRCode !== 'undefined') {
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
      text: HUB_PRODUCTION_URL,
      width: 160,
      height: 160,
      colorDark: '#090e17',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 4. Download High-Resolution Print QR
  const downloadBtn = document.getElementById('btn-download-qr');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      generateAndDownloadHighResQR(HUB_PRODUCTION_URL);
    });
  }

  // 5. "Save to Phone Contacts" (.vcf) Feature
  const saveVcardBtn = document.getElementById('btn-save-vcard');
  if (saveVcardBtn) {
    saveVcardBtn.addEventListener('click', downloadVCard);
  }
});

/**
 * Downloads official VCard (.vcf) directly into the user's mobile phone contacts.
 */
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:CryoCorp O2 LLP',
    'ORG:CryoCorp O2 LLP',
    'TITLE:Heavy Engineering & Cryogenic Solutions',
    'TEL;TYPE=WORK,VOICE:+917738069949',
    'TEL;TYPE=CELL,VOICE:+917710049939',
    'EMAIL;TYPE=WORK,INTERNET:crm@cryocorp.in',
    'URL:https://cryocorp.in/',
    'URL;TYPE=Hub:https://cryocorp-connect.vercel.app',
    'NOTE:Manufacturers of high-purity Oxygen/Nitrogen Plants, ASUs, and Cryogenic Spares.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'CryoCorp_O2_LLP.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates an ultra-sharp 1024x1024 branded QR code image for print/brochures.
 */
function generateAndDownloadHighResQR(targetUrl) {
  const canvasSize = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(0, 0, canvasSize, 140);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CRYOCORP O₂ LLP', canvasSize / 2, 70);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '500 24px "Inter", sans-serif';
  ctx.fillText('Heavy Engineering & Cryogenic Solutions', canvasSize / 2, 110);

  const tempDiv = document.createElement('div');
  tempDiv.style.display = 'none';
  document.body.appendChild(tempDiv);

  const qrSize = 640;
  const tempQR = new QRCode(tempDiv, {
    text: targetUrl,
    width: qrSize,
    height: qrSize,
    colorDark: '#090e17',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    let sourceElement = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');

    if (sourceElement) {
      const qrX = (canvasSize - qrSize) / 2;
      const qrY = 190;
      ctx.drawImage(sourceElement, qrX, qrY, qrSize, qrSize);

      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(60, 870, canvasSize - 120, 80);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 30px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(targetUrl, canvasSize / 2, 920);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, canvasSize - 8, canvasSize - 8);

      const link = document.createElement('a');
      link.download = 'CryoCorp-O2-Digital-Hub-QR.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }

    document.body.removeChild(tempDiv);
  }, 100);
}
