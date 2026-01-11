import { DB_URI } from "@/config";
import mongoose from "mongoose";

const MONGODB_URI = DB_URI as string;

if(!MONGODB_URI) {
    throw new Error("kết nối không thành công!");
}

export const dbConnect = async () => {
    if(mongoose.connection.readyState === 1) return mongoose.connection;
    console.log("Kết nối thành công!");
    return mongoose.connect(MONGODB_URI);
};