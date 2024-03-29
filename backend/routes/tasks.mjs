import express from "express";
import db from "../dbConnection.mjs";
const router = express.Router();

router.get("/all-tasks", async (req, res) => {
    let collection = await db.collection("tasks");
    console.log(req.query.tasksIds);
    let result = await collection.find({_id:{$in: req.query.tasksIds}}).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;