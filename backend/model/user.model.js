const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
    },
    image: {
        type: String,
    },
    clerkUserId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);