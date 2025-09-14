const {MongoClient, ObjectId} = require("mongodb");
require("dotenv").config();

class LibraryModel {
    
    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI);
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db(process.env.DB_NAME);
            this.collection = this.db.collection("library");
            console.log("Successfully connected to mongoDB");
        } catch (e) {
            console.error("Error connecting to MongoDB:", e);
        }
    }

    async close() {
        try {
            await this.client.close();
        } catch (e) {
            console.error("Error closing connection", e);
            throw e;
        }
    }
    
    async findById(id) {
        try {
            await this.connect();
            return await this.collection.findOne({ _id: new ObjectId(String(id)) });
        } catch (e) {
            console.error("Error finding book by ID:", e);
            throw e;
        }
    }
    
    async listAll() {
        try {
            await this.connect();
            return await this.collection.find({}).toArray();
        } catch (e) {
            console.error("Error fetching books:", e);
            throw e;
        }
    }

    async create(newBook) {
        try {
            await this.connect();
            return await this.collection.insertOne(newBook);
        } catch (e) {
            console.error("Error inserting books:", e);
            throw e;
        }
    }

    async update(bookId, updatedBook) {
        try {
            await this.connect();
            return await this.collection.updateOne(
                { _id: new ObjectId(String(bookId)) },
                { $set: updatedBook }
            );
        } catch (e) {
            console.error("Error fetching books:", e);
            throw e;
        }
    }

    async delete(bookId) {
        try {
           await this.connect();
            return await this.collection.deleteOne({ _id: new ObjectId(String(bookId)) });
        } catch (e) {
            console.error("Error fetching books:", e);
            throw e;
        }
    }
    
    async deleteAll() {
        try {
            await this.connect();
            return await this.collection.deleteMany({});
        } catch (e) {
            console.error("Error fetching books:", e);
            throw e;
        }
    }
}

module.exports = LibraryModel;