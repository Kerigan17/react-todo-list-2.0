import express from "express";
import db from "../dbConnection.mjs";
import {ObjectID} from "mongodb";
const router = express.Router();

router.get("/all-tasks", async (req, res) => {
    let collection = await db.collection("tasks");
    console.log(req.query.tasksIds);
    for(let i = 0; i < req.query.tasksIds.length; i++)
        req.query.tasksIds[i] = new ObjectID(req.query.tasksIds[i]);
    let result = await collection.find({_id:{$in: req.query.tasksIds}}).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;