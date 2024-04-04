import zipObject from "lodash.zipobject";
import { regroupDataByCategory } from "../helpers/regroup.js";
import { itemFindAll } from "../queries/itemQuery.js";

export const findAllItem = async (req, res) => {
  const response = await itemFindAll();

  const { values } = response.data;
  const titles = values.shift();
  const data = [];
  for (const i in values) {
    data.push(zipObject(titles, values[i]));
  }

  const regroupData = regroupDataByCategory(data);

  res.json({ data: regroupData });
};
