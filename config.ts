export const DB_URI = process.env.MONGODB_URI || "mongodb+srv://hau20050822:Hau22082005%40%21@cluster0.deyhofj.mongodb.net/?appName=Cluster0";
export const JWT_SECRET = process.env.JWT_SECRET || "d8771d809fce6ecf312ee8ab1a25dfdf576172294f64bfeacfb47a0d05ba04a4";
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "14d9f0db7da57a5d3d068988c3e3f631fc46e3828fb6df0b062173a0e97da622";
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || (process.env.NODE_ENV === 'production' ? "https://my-profile-one-drab.vercel.app/" : "http://localhost:3000");
