const { default: mongoose } = require("mongoose");


const questionSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // },
    jobPosition: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobExperience: {
        type: Number,
        required: true
    },
    qaList: [
        {
            question: String,
            answer: String
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Question", questionSchema);