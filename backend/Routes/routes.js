const express = require('express');
const groupService = require('../Service/groupService');
const messageService = require('../Service/messageService');

const router = express.Router();

router.post('/newgroup', groupService.new_group);
router.get('/allgroup', groupService.all_group);
router.get('/onegroup', groupService.one_group);
router.post('/newmessage', messageService.new_message);
router.get('/allmessage', messageService.all_message);
router.delete('/deletemessage', messageService.delete_message);
router.delete('/deleteallmessage', messageService.delete_all_message);
router.delete('/deletegroup', groupService.delete_group);

module.exports = router;