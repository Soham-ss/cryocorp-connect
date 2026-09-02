/**
 * CryoCorp O2 LLP - Digital Hub Client Logic
 * Handles dynamic year and comprehensive vCard phone contact export.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. "Save to Phone Contacts" (.vcf)
  const saveVcardBtn = document.getElementById('btn-save-vcard');
  if (saveVcardBtn) {
    saveVcardBtn.addEventListener('click', downloadVCard);
  }
});

/**
 * Downloads comprehensive VCard (.vcf) directly into the customer's phone address book.
 */
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:CryoCorp O2 LLP',
    'ORG:CryoCorp O2 LLP;Executive Leadership',
    'TITLE:Dr. Jaya Goyal (Managing Partner) & Ashish Goyal (Managing Director)',
    'TEL;TYPE=WORK,VOICE,PREF:+919821219939',
    'TEL;TYPE=WORK,VOICE:+919004759939',
    'TEL;TYPE=CELL,VOICE,WHATSAPP:+919821219939',
    'EMAIL;TYPE=WORK,INTERNET:crm@cryocorp.in',
    'URL:https://cryocorp.in/',
    'URL;TYPE=Hub:https://cryocorp-connect.vercel.app',
    'NOTE:Breathing Life: Your Oxygen Plant Partner. Manufacturers of high-purity Oxygen/Nitrogen Plants, ASUs, and Cryogenic Spares.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'CryoCorp_O2_LLP_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
