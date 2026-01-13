import { DB_URI } from "@/config";
import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URI = DB_URI as string;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            family: 4,
            retryWrites: true
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Database connected successfully!");
            return mongoose;
        }).catch((error) => {
            console.error("Database connection failed:", error);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error("Database connection error:", e);
        throw e;
    }

    return cached.conn;
};