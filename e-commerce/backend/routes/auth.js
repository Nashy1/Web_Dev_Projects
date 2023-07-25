const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {
    console.log("Attempting to create new user")
    try {
        if (req.body?.password !== req.body?.confirmPassword)
            throw "Passwords do not match";

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log("Error in creating new user", error)
        res.status(500).json(error);
    }
})

// LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        if (!user) {
            res.status(401).json("Incorrect username login!");
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            res.status(401).json("Incorrect password!");
            return;
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ others, accessToken });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;