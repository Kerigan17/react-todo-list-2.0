import express from "express";
import db from "../dbConnection.mjs";
import {ObjectId} from "mongodb";

const router = express.Router();
// Get a single post
router.get("/user", async (req, res) => {
    let collection = await db.collection("users");
    let query = {
        login: req.params.login,
        password: req.params.password
    };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.get("/all-users", async (req, res) => {
    let collection = await db.collection("users");
    let result = await collection.find({}).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


// Add a new document to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("posts");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// Update the post with a new comment
router.patch("/comment/:id", async (req, res) => {
    const query = {_id: ObjectId(req.params.id)};
    const updates = {
        $push: {comments: req.body}
    };

    let collection = await db.collection("posts");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = {_id: ObjectId(req.params.id)};

    const collection = db.collection("posts");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;