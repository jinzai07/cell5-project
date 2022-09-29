import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:admin@cluster0.fhucehk.mongodb.net/?retryWrites=true&w=majority'
  );

  return client;
}
