import express from "express";
import db from "../dbConnection.mjs";
const router = express.Router();

router.get("/all-tasks", async (req, res) => {
    let collection = await db.collection("tasks");
    let result = await collection.find({$where : function () {
            req.query.tasksIds.forEach(item => {
                return (this.text === this.priority)
            })
        }}).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;