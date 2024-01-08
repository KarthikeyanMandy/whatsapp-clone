const Group = require('../Model/group');
const pusher = require('../Config/pusher');

const groupService = {
    new_group: async (req, res) => {
        try {
            const { groupName } = req.body;
            const group = new Group({ name: groupName })
            await group.save()
            if (group) {
                pusher.trigger('groups', 'inserted', group);
            }
            res.send("Group created successfully");
        } catch (error) {
            res.status(400).send(error);
        }
    },
    all_group: async (req, res) => {
        try {
            const groups = await Group.find({})
            res.send(groups);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    one_group: async (req, res) => {
        try {
            const groupId = req.query.id;
            const group = await Group.findOne({ _id: groupId })
            res.send(group);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    delete_group: async (req, res) => {
        try {
            const groupId = req.query.id;
            const group = await Group.findByIdAndDelete({ _id: groupId })
            if (group) {
                pusher.trigger('groups', 'deleted', group);
                res.send(group)
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = groupService;