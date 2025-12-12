import { NextApiRequest, NextApiResponse } from "next";
import Order from "../../../../../models/Order";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { userId, items, totalPrice, transactionId } = req.body;

      const newOrder = new Order({
        userId,
        items,
        totalPrice,
        transactionId,
        status: "pending",
        createdAt: new Date(),
      });

      await newOrder.save();
      res.status(201).json({ message: "Order created", order: newOrder });
    } catch (err) {
      res.status(500).json({ error: "Error creating order" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
