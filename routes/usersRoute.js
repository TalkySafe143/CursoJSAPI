const express = require("express");
const router = express.Router();
const MongoDB = require("../lib/mongo");
const { ObjectId } = require('mongodb');
const mongo = new MongoDB();
const passport = require('passport');
require('../utils/auth/jwt');

router.get("/", passport.authenticate('jwt', {session: false}),async (req, res, next) => {
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
    const data = await mongo.getOne("users", {email : req.params.id});
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
    const data = await mongo.updateOne("users", req.body ,{email : req.params.id});
    return res.status(200).json({
        data
    })
})

router.delete("/:id", async (req, res, next) => {
    const data = await mongo.deleteOne("users", {email : req.params.id});
    return res.status(200).json({
        data
    })
})

module.exports = router;