import express from "express";
import db from "../dbConnection.mjs";
import {ObjectID} from "mongodb";
const router = express.Router();

router.get("/all-tasks", async (req, res) => {
    const userId = req.query.user_id;
    let collection = await db.collection("tasks");
    let result = await collection.find({user_id: userId}).toArray();
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;