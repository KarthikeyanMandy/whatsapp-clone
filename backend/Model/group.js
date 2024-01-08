const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Group = mongoose.model("Groups", groupSchema);

module.exports = Group;