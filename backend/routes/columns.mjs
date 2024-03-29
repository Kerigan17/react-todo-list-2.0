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

// router.patch("/drop-task", async (req, res) => {
//     let collection = await db.collection("columns");
//     let result = await collection.find({});
//     // let columns = result.data;
//     // console.log(columns[req.params.sourceId])
//     // console.log(columns[req.params.destinationId])
//
//     res.send(result).status(200);
// });
router.patch("/drop-task", async (req, res) => {
    const { user_id,taskId,sourceId,destinationId,destinationIndex}  = req.body;
    let collection = await db.collection("columns");
    let result = await collection.findOne({user_id:user_id});

    result.data[sourceId].remove(taskId);
    result.data[destinationId].splice(destinationIndex, 0, source);



    if (!result) res.send("Not found").status(404);
    else res.send(result.data).status(200);
});

export default router;