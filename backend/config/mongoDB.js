import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbConnection;

const connectMongoDB = async () => {
  if (dbConnection) return dbConnection;

  try {
    const connection = await client.connect();
    dbConnection = connection.db();
    console.log("Successfully connected to MongoDB!");
    return dbConnection;
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
};

export default connectMongoDB;
