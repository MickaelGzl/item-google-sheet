import { sheets } from "../db/database.js";
import { config } from "dotenv";
config();
const _id = process.env.SPREADSHEET_ID;

export const itemFindAll = () => {
  return sheets.spreadsheets.values.get({
    spreadsheetId: _id,
    range: "Inventaire!A:F",
  });
};
