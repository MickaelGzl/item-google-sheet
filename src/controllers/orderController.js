import { orderCreate } from "../queries/orderQuery.js";

export const addOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items) {
      return res.json({ message: "Aucun item acheté." });
    }
    const price = items.reduce(
      (acc, cur) => acc + parseFloat(cur.price) * parseInt(cur.quantity),
      0
    );
    const order = await orderCreate(
      price,
      JSON.stringify(
        items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))
      )
    );
    return res.json({ message: "succesfully add order" });
  } catch (error) {
    console.error("<addOrder>: ", error);
    return res.status(500).json({ message: "error while create order" });
  }
};
