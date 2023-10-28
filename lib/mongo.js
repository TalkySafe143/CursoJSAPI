const config = require("../config");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@clusterapi.jjdf825.mongodb.net/?retryWrites=true&w=majority`;

class MongoDB {
    client;
    constructor() {
        this.client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true
            }
        });
    }

    async getAll(collection) {
        await this.client.connect();
        const users = this.client.db("API").collection(collection); 
        return users.find();
    }

    async getOne(collection, query) {
        await this.client.connect();
        const users = this.client.db("API").collection(collection);
        return await users.findOne(query);
    }
}

module.exports = MongoDB;