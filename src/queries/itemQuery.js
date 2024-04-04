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

export const itemFindOne = async (id) => {
  console.log(id);
  const titles = await sheets.spreadsheets.values.get({
    spreadsheetId: _id,
    range: "Inventaire!A1:F1",
  });

  const datas = await sheets.spreadsheets.values.get({
    spreadsheetId: _id,
    range: `Inventaire!A${id}:F${id}`,
  });

  return [...titles.data.values, ...datas.data.values];
};

export const itemQuantityUpdate = async (id, quantity) => {
  return await sheets.spreadsheets.values.update({
    spreadsheetId: _id,
    range: `Inventaire!D${id}`,
    valueInputOption: "RAW",
    resource: {
      values: [[quantity]],
    },
  });
};
