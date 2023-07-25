const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide an email."],
            lowercase: true,
            trim: true,
            unique: [true, "You've already subscribed."]
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Subscriber", SubscriberSchema);