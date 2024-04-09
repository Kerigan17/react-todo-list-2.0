import express from "express";
import db from "../dbConnection.mjs";
import {ObjectId} from "mongodb";
const router = express.Router();

router.get("/all-tasks", async (req, res) => {
    const userId = req.query.user_id;
    let collection = await db.collection("tasks");
    let result = await collection.find({user_id: userId}).toArray();
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.delete("/delete-task", async (req, res) => {
    const query = {_id: ObjectId(req.query.task_id)};

    const collection = db.collection("tasks");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

router.post("/add-task", async (req, res) => {
    let collection = await db.collection("tasks");
    let result = await collection.insertOne({
        title: req.body.title,
        text: req.body.text,
        priority: req.body.priority,
        date: req.body.date,
        user_id: req.body.userId
    });
    res.send(result).status(204);
});

router.patch("/edit-task", async (req, res) => {
    const id = {_id: ObjectId(req.body.task_id)};
    let collection = await db.collection("tasks"); //req.body.task
    let result = await collection.updateOne(
        id,
        {
            $set: req.body.update_task
        }
    );
    res.send(result).status(200);
});

export default router;