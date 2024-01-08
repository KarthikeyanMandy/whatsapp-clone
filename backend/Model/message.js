const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        groupId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;