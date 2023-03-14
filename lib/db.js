import { MongoClient } from "mongodb";


export async function connectToDB() {
    const client = await MongoClient.connect('mongodb+srv://peoul:3qHaZgX1DqKoHkMy@cluster0.amce53h.mongodb.net/AuthDB?retryWrites=true&w=majority')

    return client;
}