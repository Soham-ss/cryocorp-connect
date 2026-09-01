/**
 * CryoCorp O2 LLP - Digital Hub Client Logic
 * Handles dynamic content and instant vCard phone contact export.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // "Save to Phone Contacts" (.vcf)
  const saveVcardBtn = document.getElementById('btn-save-vcard');
  if (saveVcardBtn) {
    saveVcardBtn.addEventListener('click', downloadVCard);
  }
});

/**
 * Downloads official VCard (.vcf) directly into the customer's phone address book.
 */
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:CryoCorp O2 LLP',
    'ORG:CryoCorp O2 LLP',
    'TITLE:Breathing Life: Your Oxygen Plant Partner',
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
