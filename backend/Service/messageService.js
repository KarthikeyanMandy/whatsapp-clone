const Message = require('../Model/message');
const pusher = require('../Config/pusher');

const messageService = {
    new_message: async (req, res) => {
        try {
            const { name, message, timestamp, userId, groupId } = req.body;
            const newMessage = new Message({ name, message, timestamp, userId, groupId });
            await newMessage.save();
            if (newMessage) {
                pusher.trigger('messages', 'inserted', newMessage);
            }
            res.send("Message stored successfully");
        } catch (error) {
            res.status(400).send(error);
        }
    },
    all_message: async (req, res) => {
        try {
            const groupId = req.query.id;
            const messages = await Message.find({ groupId: groupId });
            res.send(messages);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    delete_message: async (req, res) => {
        try {
            const messageId = req.query.id;
            const message = await Message.findByIdAndDelete({ _id: messageId });
            if (message) {
                pusher.trigger('messages', 'deleted', message);
                res.send("Message deleted successfully")
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    delete_all_message: async (req, res) => {
        try {
            const groupId = req.query.id;
            const messages = await Message.deleteMany({ groupId: groupId })
            console.log(messages);
            if (messages) {
                pusher.trigger('messages', 'cleared', groupId);
                res.send("Messages deleted successfully");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = messageService;