import express from "express";
import db from "../dbConnection.mjs";
import {ObjectId} from "mongodb";
const router = express.Router();

router.get("/user-columns", async (req, res) => {
    let collection = await db.collection("columns");
    let result = await collection.findOne({user_id: req.query.user_id});
    if (!result) res.send("Not found").status(404);
    else res.send(result.data).status(200);
});

router.patch("/drop-task", async (req, res) => {
    const {user_id, task_id, source_id, destination_id, destination_index} = req.body;
    let collection = await db.collection("columns");
    let result = await collection.findOne({user_id:user_id});
    let source = result.data[source_id];
    let destination = result.data[destination_id];

    source.splice(source.indexOf(task_id),1);
    destination.splice(destination_index, 0, task_id);
    result.data[source_id] = source;
    result.data[destination_id] = destination;

    console.log(result.data);
    result = await collection.updateOne(
        {user_id:user_id},
        {
            $set:{data:result.data}
        }
    );

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;