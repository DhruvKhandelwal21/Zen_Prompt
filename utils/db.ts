import mongoose, { ConnectOptions } from "mongoose";
let isConnected = false;
export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return "Database is already connected";
  }
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "zenPrompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
