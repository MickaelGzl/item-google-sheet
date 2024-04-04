import { sheets } from "../db/database.js";
import { config } from "dotenv";
config();
const _id = process.env.SPREADSHEET_ID;

export const orderCreate = async (price, items) => {
  return await sheets.spreadsheets.values.append({
    spreadsheetId: _id,
    range: "Commande!A:C",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [[new Date(), price, items]],
    },
  });
};
