import mongoose from "mongoose";

 export async function connectMongoDB(url) {
    return mongoose.connect(url);
}
