import {MongoClient} from "mongodb";

const dbURL = 'mongodb+srv://kerigan_17:test1234@atlascluster.s87stgu.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
const client = new MongoClient(dbURL);

let conn;
try {
    conn = await client.connect()
} catch (e) {
    console.log(e);
}
let db = await conn.db('taskList');
export default db;