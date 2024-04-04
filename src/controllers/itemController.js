import zipObject from "lodash.zipobject";
import { regroupDataByCategory } from "../helpers/regroup.js";
import {
  itemFindAll,
  itemFindOne,
  itemQuantityUpdate,
} from "../queries/itemQuery.js";

export const findAllItem = async (req, res) => {
  try {
    const response = await itemFindAll();

    const { values } = response.data;
    const titles = values.shift();
    const data = [];
    for (const i in values) {
      data.push(zipObject(titles, values[i]));
    }

    const regroupData = regroupDataByCategory(data);

    res.json({ data: regroupData });
  } catch (error) {
    console.error("<findAllItem: ", error);
    return res.statsus(500).json({ message: "error while fetch all items" });
  }
};

export const findItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id) + 1;
    const values = await itemFindOne(id);

    const titles = values.shift();
    const data = [];
    for (const i in values) {
      data.push(zipObject(titles, values[i]));
    }
    data[0].id = id;
    res.json({ data: data[0] });
  } catch (error) {
    console.error("<findItemById: ", error);
    return res.statsus(500).json({ message: "error while fetch item" });
  }
};

export const updateItemQuantity = async (req, res) => {
  try {
    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity)) {
      return res
        .status(400)
        .json({ message: "La quantité acheté doit être un nombre." });
    }
    const id = parseInt(req.params.id) + 1;
    const values = await itemFindOne(id);

    const titles = values.shift();
    const data = [];
    for (const i in values) {
      data.push(zipObject(titles, values[i]));
    }
    const newQuantity =
      parseInt(data[0].quantity) - parseInt(req.body.quantity);
    if (newQuantity < 0) {
      return res.json({
        message: "La quantité acheté dépasse la quantité actuelle du produit.",
      });
    }
    await itemQuantityUpdate(id, newQuantity);
    data[0].id = id;
    res.json({ data: { ...data[0], quantity: newQuantity } });
  } catch (error) {
    console.error("<updateItemQuantity: ", error);
    return res
      .status(500)
      .json({ message: "error while updating item quantity" });
  }
};
