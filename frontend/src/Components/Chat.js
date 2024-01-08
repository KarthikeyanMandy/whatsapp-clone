import React, { useCallback, useEffect, useState } from 'react';
import '../style.css';
import { IconButton, Avatar, Modal, Button } from '@mui/material';
import { InsertEmoticon, Send } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useStateValue } from './StateProvider';
import service from '../service';
import EmojiPicker from 'emoji-picker-react';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Pusher from 'pusher-js';

const Chat = ({ groupId, setSelectedChat }) => {

    const [state] = useStateValue();
    const [messages, setMessages] = useState([])
    const [anchorElClear, setAnchorElClear] = useState(null);
    const [emojiVisible, setEmojiVisible] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [clearModal, setclearModal] = useState(false)
    const [messageDelete, setMessageDelete] = useState(null);
    const [values, setValues] = useState({
        name: state.user.displayName,
        message: "",
        userId: state.user.uid,
        groupId: groupId
    })

    const [data, setData] = useState({
        groupName: "",
        createdAt: ""
    })

    const getAllMessages = useCallback(() => {
        service.allMessage(groupId)
            .then((response) => {
                setMessages(response.data);
            })
            .catch(error => {
                console.log("Something went wrong", error);
            });
    }, [groupId]);

    const handleClearModal = () => {
        setclearModal(true);
        handleClearClosePopover();
    }

    const handleOpenDeleteModal = (messageId) => {
        setMessageDelete(messageId);
        setModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setMessageDelete(null);
        setModalOpen(false);
    };

    const handleClearButtonClick = (event) => {
        setAnchorElClear(event.currentTarget);
    };

    const handleClearClosePopover = () => {
        setAnchorElClear(null);
    };

    const handleClearChat = (groupId) => {
        service.deleteAllMessage(groupId)
            .then(response => {
                console.log(response)
                setclearModal(false)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    const sameday = (firstDate, secondDate) => {
        return (
            firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() === secondDate.getDate()
        );
    };

    const daySeparator = (message, index, messages) => {
        const currentMessageDate = new Date(message.createdAt);
        const today = new Date();
        if (index === 0) {
            if (sameday(currentMessageDate, today)) {
                return (
                    <div key={`day-${index}`} className='chat-date'>
                        <p>Today</p>
                    </div>
                );
            } else {
                return (
                    <div key={`day-${index}`} className='chat-date'>
                        <p>{new Date(message.createdAt).toDateString().slice(4)}</p>
                    </div>
                );
            }
        }
        const prevMessageDate = new Date(messages[index - 1].createdAt);
        if (!sameday(currentMessageDate, prevMessageDate)) {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            if (sameday(currentMessageDate, today)) {
                return (
                    <div key={`day-${index}`} className='chat-date'>
                        <p>Today</p>
                    </div>
                );
            } else if (sameday(currentMessageDate, yesterday)) {
                return (
                    <div key={`day-${index}`} className='chat-date'>
                        <p>Yesterday</p>
                    </div>
                );
            } else {
                return (
                    <div key={`day-${index}`} className='chat-date'>
                        <p>{currentMessageDate.toDateString().slice(4)}</p>
                    </div>
                );
            }
        }
        return null;
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (values.message) {
            service.newMessage(values)
                .then(response => {
                    setValues((prevValues) => ({ ...prevValues, message: "" }));
                    setEmojiVisible(false);
                })
                .catch(error => {
                    console.log("Something went wrong", error);
                })
        }
    }

    const deleteMessage = (messageId) => {
        service.deleteMessage(messageId)
            .then(response => {
                handleCloseDeleteModal();
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }

    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            groupId: groupId
        }))
        service.oneGroup(groupId)
            .then((response) => {
                setData((prevValues) => ({
                    ...prevValues,
                    groupName: response.data.name,
                    createdAt: response.data.createdAt
                }))
                getAllMessages();
            })
            .catch(error => {
                console.log("Something went wrong", error);
            })
    }, [groupId, getAllMessages]);

    useEffect(() => {
        const pusher = new Pusher('797f0d735e0333002f5d', { cluster: 'ap2' });
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (data) => {
            const existingMessage = messages.some(
                (message) => message._id === data._id
            );
            if (!existingMessage) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });
        channel.bind('deleted', (data) => {
            const filterMessages = messages.filter(message => message._id !== data._id);
            setMessages(filterMessages);
        });
        channel.bind('cleared', () => {
            getAllMessages();
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages, getAllMessages])

    return (
        <div className='chat-container'>
            <div className='chat-header'>
                <div style={{ display: "flex" }}>
                    <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${groupId}`} />
                    <div className='chat-profile'>
                        <h3>{data.groupName}</h3>
                        <p>Created at {new Date(data.createdAt).toDateString().slice(4)}</p>
                    </div>
                </div>
                <div>
                    <IconButton onClick={handleClearButtonClick}>
                        <MoreVertOutlinedIcon />
                    </IconButton>
                    <Popover
                        open={Boolean(anchorElClear)}
                        anchorEl={anchorElClear}
                        onClose={handleClearClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleClearModal}>Clear Chat</MenuItem>
                        <MenuItem onClick={() => setSelectedChat(null)}>Close Chat</MenuItem>
                    </Popover>
                    <Modal
                        open={clearModal}
                        onClose={() => setclearModal(false)}
                        aria-labelledby="clear-message-modal-title"
                    >
                        <div className='modal-content'>
                            <p id="clear-message-modal-title">Clear chat?</p>
                            <div className='modal-btn'>
                                <Button onClick={() => handleClearChat(groupId)}>Clear</Button>
                                <Button onClick={() => setclearModal(false)}>Cancel</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className='chat-body'>
                {messages.map((message, index) => (
                    <React.Fragment key={index}>
                        {groupId === message.groupId &&
                            <>
                                {daySeparator(message, index, messages)}
                                <div className={`chat-message ${message.userId === state.user.uid && 'chat-sent'}`} key={index} >
                                    <p className='chat-name'>{message.name}</p>
                                    <p>{message.message}</p>
                                    <p className='chat-time'>{new Date(message.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                    <div className={`${message.userId === state.user.uid ? 'delete-sent' : 'delete-receive'}`}>
                                        <IconButton onClick={() => handleOpenDeleteModal(message._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Modal
                                            open={modalOpen && messageDelete === message._id}
                                            onClose={handleCloseDeleteModal}
                                            aria-labelledby="delete-message-modal-title"
                                        >
                                            <div className='modal-content'>
                                                <p id="delete-message-modal-title">Delete message?</p>
                                                <div className='modal-btn'>
                                                    <Button onClick={() => deleteMessage(message._id)}>Delete</Button>
                                                    <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </>
                        }
                    </React.Fragment>
                ))}
            </div>
            <div className='emoji-container'>
                {emojiVisible &&
                    <EmojiPicker
                        height={350}
                        onEmojiClick={(emojiObject) =>
                            setValues(prevValues => ({ ...prevValues, message: prevValues.message + emojiObject.emoji }))}
                    />
                }
            </div>
            <div className='chat-footer'>
                <IconButton onClick={() => setEmojiVisible(!emojiVisible)}>
                    <InsertEmoticon style={{ cursor: "pointer" }} />
                </IconButton>
                <form autoComplete='off'>
                    <input
                        type='text'
                        placeholder='Type a message'
                        name='message'
                        value={values.message}
                        onChange={handleChange}
                    />
                    <button onClick={sendMessage}><Send /></button>
                </form>
            </div>
        </div >
    )
}

export default Chat;