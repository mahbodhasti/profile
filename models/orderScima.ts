const orderSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true }, // <- مطمئن شوید در POST این فیلد هست
  phone: { type: String },
  items: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true }, // <- حتماً فرستاده شود
  transactionId: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
});
