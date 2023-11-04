const express = require("express");
const router = express.Router();
const MongoDB = require("../lib/mongo");
const { ObjectId } = require('mongodb');
const mongo = new MongoDB();
router.get("/", async (req, res, next) => {
    const data = await mongo.getAll("users");
    const results =[];
    for await (const doc of data) {
        results.push(doc);
    }
    res.status(200).json({
        results
    })
});

router.get("/:id", async (req, res, next) => {
    const data = await mongo.getOne("users", {_id : new ObjectId(req.params.id)});
    return res.status(200).json({
        data
    })
})

router.post("/", async (req, res, next) => {
    const result = await mongo.createOne("users", req.body);
    return res.status(200).json({
        result
    })
})

router.put("/:id", async (req, res, next) => {
    const data = await mongo.updateOne("users", req.body ,{_id : new ObjectId(req.params.id)});
    return res.status(200).json({
        data
    })
})

router.delete("/:id", async (req, res, next) => {
    const data = await mongo.deleteOne("users", {_id : new ObjectId(req.params.id)});
    return res.status(200).json({
        data
    })
})

module.exports = router;