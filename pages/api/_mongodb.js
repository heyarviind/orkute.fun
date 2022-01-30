import mongoose from "mongoose";

export default async function () {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(
    process.env.MONGODB_URL + process.env.MONGODB_DATABASE_NAME,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}
