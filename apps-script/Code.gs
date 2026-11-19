const SPREADSHEET_ID = '1lty_XbrCrdX4tcFZRqj3Mh1preCHra34i88Hnh6XdK8';
const SHEET_ID = 0;

function doPost(event) {
  const data = event.parameter;
  const submissionId = String(data.submissionId || '');

  if (!/^[a-zA-Z0-9-]{20,60}$/.test(submissionId)) {
    return responsePage_(submissionId, false, 'Invalid submission.');
  }

  const fullName = String(data.fullName || '').trim();
  const phoneNumber = String(data.phoneNumber || '').trim();
  const assetType = String(data.assetType || '').trim();
  const allowedAssets = ['motorcycles', 'bajaj', 'trucks', 'other'];

  if (!fullName || !/^\+[1-9]\d{1,14}$/.test(phoneNumber) || !allowedAssets.includes(assetType)) {
    return responsePage_(submissionId, false, 'Please check the registration details.');
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetById(SHEET_ID);
    if (!sheet) throw new Error('The configured spreadsheet tab was not found.');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Full name', 'Phone number', 'Asset type', 'Registered at']);
    }
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, 3).setNumberFormat('@');
    sheet.getRange(nextRow, 1, 1, 4).setValues([[fullName, phoneNumber, assetType, new Date()]]);
    SpreadsheetApp.flush();
    return responsePage_(submissionId, true, 'Registration saved.');
  } catch (error) {
    console.error('Could not save waitlist registration:', error);
    return responsePage_(submissionId, false, 'Could not save registration.');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function responsePage_(submissionId, success, message) {
  const result = JSON.stringify({
    type: 'MILIKI_WAITLIST_RESULT',
    submissionId: submissionId,
    success: success,
    message: message
  }).replace(/</g, '\\u003c');

  return HtmlService.createHtmlOutput(
    '<!doctype html><html><body><script>' +
    'window.top.postMessage(' + result + ', "*");' +
    '</script></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
