// makeAdmin.js
import mongoose from "mongoose";
import User from "./src/models/User.js"; // مسیر مدل User را با پروژه‌ات تطبیق بده

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

async function makeAdmin(email) {
  await mongoose.connect(MONGO_URI);
  const res = await User.updateOne({ email }, { $set: { isAdmin: true } });
  console.log(`Result for ${email}:`, res);
  await mongoose.disconnect();
}

const email = process.argv[2];
if (!email) {
  console.error("Usage: node makeAdmin.js email@example.com");
  process.exit(1);
}

makeAdmin(email).catch((err) => {
  console.error(err);
  process.exit(1);
});
