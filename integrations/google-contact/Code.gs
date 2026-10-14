// Bind this script to the Konuko Foundation Contact Google Form.
// Run setup once from the editor, then deploy as a web app.
function setup() {
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty('CONTACT_FORM_ID', FormApp.getActiveForm().getId());
  if (!properties.getProperty('CONTACT_SECRET')) {
    properties.setProperty('CONTACT_SECRET', Utilities.getUuid() + Utilities.getUuid());
  }
}

function doPost(e) {
  let result = { ok: false };
  try {
    const data = JSON.parse(e.postData.contents);
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('CONTACT_SECRET');
    if (!secret || data.secret !== secret) throw new Error('Unauthorized');
    const form = FormApp.openById(properties.getProperty('CONTACT_FORM_ID'));
    if (!form.isAcceptingResponses()) throw new Error('Form is closed');
    const fields = [
      ['name', 642011446, 200],
      ['email', 1531382470, 254],
      ['subject', 893566828, 200],
      ['message', 144764611, 5000],
    ];
    const response = form.createResponse();
    fields.forEach(function(field) {
      const value = data[field[0]];
      if (typeof value !== 'string' || !value.trim() || value.length > field[2]) throw new Error('Invalid field');
      const item = form.getItemById(field[1]);
      const answer = field[0] === 'message'
        ? item.asParagraphTextItem().createResponse(value.trim())
        : item.asTextItem().createResponse(value.trim());
      response.withItemResponse(answer);
    });
    response.submit();
    result = { ok: true };
  } catch (error) {
    result = { ok: false };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
