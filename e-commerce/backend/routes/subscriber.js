"use strict";

const validator = require("email-validator");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Subscriber = require("../models/Subscriber")
const router = require("express").Router();

router.post("/subscribe", async (req, res) => {
    try {        
        if (!req.body.email)
            throw "Email is required";
        
        if (!validator.validate(req.body.email))
            throw "Email is not valid.";

            const newSubscriber = new Subscriber(req.body);
            const savedSubscriber = await newSubscriber.save();
            res.status(201).json({ success: true, savedSubscriber });
        }
    catch (error) {
        console.log("Error in creating new user", error.name, error.code)
        if (error.code === 11000) {
            // Duplicate username
            console.log("You have already subscribed")
            return res.status(422).json({ success: false, message: 'You have already subscribed!' });
        }
        // Some other error
        return res.status(422).json({ success: false, message: error })
    }
})

// DELETE
router.delete("/:email", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Subscriber.findOneAndDelete({ email: req.params.email });
        res.status(200).json("Subscriber has unsubscribed.");
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET Subscriber
router.get("/find/:email", verifyTokenAndAdmin, async (req, res) => {
    try {
        const subscriber = await Subscriber.find({ email: req.params.userId });
        res.status(200).json(subscriber);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL Subscribers
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;