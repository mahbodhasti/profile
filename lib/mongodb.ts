import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      dbName: "mahboddb",
      bufferCommands: false,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    isConnected = connection.readyState === 1;
    console.log("✅ MongoDB connected:", connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw new Error("MongoDB connection failed");
  }
}
