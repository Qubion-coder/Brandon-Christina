/**
 * Google Apps Script – Brandon & Christina wedding RSVP
 *
 * Saves every RSVP from the invitation website into:
 * https://docs.google.com/spreadsheets/d/1sDguUJuNZtLkSNTy16tD7JoMQK-DBbS2Dhg4BtmeSSc/edit
 *
 * The "RSVP" tab and its header row are created automatically on the first submission
 * (or run `setup` once from the editor to create them straight away).
 *
 * HOW TO DEPLOY
 * 1. Open the spreadsheet above > Extensions > Apps Script
 * 2. Delete everything in Code.gs and paste this whole file > Save
 * 3. (Optional) Choose `setup` in the function dropdown > Run > allow access
 * 4. Deploy > New deployment > gear icon > Web app
 *      Execute as:      Me
 *      Who has access:  Anyone
 * 5. Deploy > authorize > copy the "Web app URL" (ends in /exec)
 * 6. Put that URL in the website (see GOOGLE_SCRIPT_URL in src/App.tsx, or the
 *    VITE_GOOGLE_SCRIPT_URL environment variable in Vercel) and redeploy the site
 *
 * After editing this script later: Deploy > Manage deployments > edit (pencil) >
 * Version: "New version" > Deploy. That keeps the same URL.
 */

var SPREADSHEET_ID = "1sDguUJuNZtLkSNTy16tD7JoMQK-DBbS2Dhg4BtmeSSc";

var SHEETS = {
  RSVP: {
    headers: ["Timestamp", "Full Name", "Attendance", "Guests", "Guest Names", "Message", "Invited As"],
    widths: [170, 200, 170, 90, 260, 320, 180],
  },
};

var HEADER_BACKGROUND = "#5c1a2b"; // burgundy, matches the website
var HEADER_TEXT = "#ffffff";

/** Website form posts here */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Stops two guests submitting at the same moment from overwriting each other's row
    lock.waitLock(20000);

    var params = (e && e.parameter) || {};
    var sheetName = params.sheetName || "RSVP";
    var config = SHEETS[sheetName];
    if (!config) {
      return jsonResponse({ status: "error", message: "Unknown sheet: " + sheetName });
    }

    var data = params.data ? JSON.parse(params.data) : {};
    var sheet = getOrCreateSheet(sheetName, config);

    var row = config.headers.map(function (header) {
      if (header === "Timestamp") return new Date();
      var value = data[header];
      return value === undefined || value === null ? "" : String(value);
    });

    sheet.appendRow(row);

    return jsonResponse({ status: "success", sheet: sheetName });
  } catch (error) {
    return jsonResponse({ status: "error", message: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the web app URL in a browser shows this, so you can check it is live */
function doGet() {
  return jsonResponse({ status: "ok", message: "Brandon & Christina RSVP endpoint is running." });
}

/** Run once from the editor to create the RSVP tab and headers immediately */
function setup() {
  Object.keys(SHEETS).forEach(function (name) {
    getOrCreateSheet(name, SHEETS[name]);
  });
}

function getOrCreateSheet(name, config) {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  // Write headers when the tab is new/empty, or repair them if someone edited row 1
  var headerRange = sheet.getRange(1, 1, 1, config.headers.length);
  var current = headerRange.getValues()[0];
  var headersMatch = config.headers.every(function (header, i) {
    return current[i] === header;
  });

  if (!headersMatch) {
    headerRange
      .setValues([config.headers])
      .setFontWeight("bold")
      .setBackground(HEADER_BACKGROUND)
      .setFontColor(HEADER_TEXT)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 32);

    config.widths.forEach(function (width, i) {
      sheet.setColumnWidth(i + 1, width);
    });

    // Timestamp column readable as date + time; long text columns wrap
    sheet.getRange("A2:A").setNumberFormat("dd MMM yyyy, hh:mm AM/PM");
    var guestNamesCol = config.headers.indexOf("Guest Names") + 1;
    var messageCol = config.headers.indexOf("Message") + 1;
    if (guestNamesCol > 0) sheet.getRange(2, guestNamesCol, sheet.getMaxRows() - 1).setWrap(true);
    if (messageCol > 0) sheet.getRange(2, messageCol, sheet.getMaxRows() - 1).setWrap(true);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
