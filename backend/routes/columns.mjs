import express from "express";
import db from "../dbConnection.mjs";
const router = express.Router();

router.get("/user-columns", async (req, res) => {
    let collection = await db.collection("columns");
    let result = await collection.findOne({user_id: req.query.user_id});
    if (!result) res.status(404).send({
        new: [],
        progress: [],
        done: []
    });
    else res.send(result.data).status(200);
});

router.patch("/drop-task", async (req, res) => {
    const {user_id, columns} = req.body;
    let collection = await db.collection("columns");
    let result = await collection.updateOne(
        {user_id:user_id},
        {
            $set:{data:columns}
        }
    );

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;