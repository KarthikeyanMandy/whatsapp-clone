import React, { useState } from 'react';
import { IconButton, Avatar, Modal, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import service from '../service';


const Chats = ({ id, name, handleChatClick }) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [groupDelete, setGroupDelete] = useState(null);

    const handleOpenGroupDeleteModal = (groupId) => {
        setGroupDelete(groupId);
        setModalOpen(true);
    };

    const handleCloseGroupDeleteModal = () => {
        setGroupDelete(null);
        setModalOpen(false);
    };

    const deleteGroup = (deleteId) => {
        service.deleteGroup(deleteId)
            .then(response => {
                service.deleteAllMessage(deleteId)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log("Something went wrong", error)
                    })
            })
            .catch(error => {
                console.log("Something went wrong", error);
            })
    }

    return (
        <div className='chats-container'>
            <div className='chats-profile' onClick={() => { handleChatClick(id) }}>
                <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} />
                <h3>{name}</h3>
            </div>
            <div className='chats-delete'>
                <IconButton onClick={() => handleOpenGroupDeleteModal(id)}>
                    <DeleteIcon />
                </IconButton>
                <Modal
                    open={modalOpen && groupDelete === id}
                    onClose={handleCloseGroupDeleteModal}
                    aria-labelledby="delete-group-modal-title"
                >
                    <div className='modal-content'>
                        <p id="delete-group-modal-title">Delete group?</p>
                        <div className='modal-btn'>
                            <Button onClick={() => deleteGroup(id)}>Delete</Button>
                            <Button onClick={handleCloseGroupDeleteModal}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Chats;