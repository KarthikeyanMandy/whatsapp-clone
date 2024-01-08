import React, { useEffect, useState } from 'react';
import { IconButton, Avatar } from '@mui/material';
import { useStateValue } from './StateProvider';
import Chats from './Chats';
import Modal from './Modal';
import service from '../service';
import Pusher from 'pusher-js';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { auth } from '../firebase';

const Sidebar = ({ handleChatClick, setSelectedChat, selectedChat }) => {

    const [state, dispatch] = useStateValue();
    const [groups, setGroups] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [anchorElClear, setAnchorElClear] = useState(null);

    const handleClearButtonClick = (event) => {
        setAnchorElClear(event.currentTarget);
    };

    const handleClearClosePopover = () => {
        setAnchorElClear(null);
    };

    const handleModal = () => {
        setOpenModal(true);
        handleClearClosePopover();
    }

    const logout = () => {
        auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                dispatch({ type: "sign_out", user: null })
            })
            .catch((err) => {
                console.log("Error", err)
            })
    }

    const allGroups = () => {
        service.allGroup()
            .then((response) => {
                setGroups(response.data);
            })
            .catch(error => {
                console.log("Something went wrong", error);
            })
    }

    useEffect(() => {
        allGroups();
    }, [])

    useEffect(() => {
        const pusher = new Pusher('797f0d735e0333002f5d', { cluster: 'ap2' });
        const channel = pusher.subscribe('groups');
        channel.bind('inserted', (data) => {
            const existingGroup = groups.some(
                (group) => group._id === data._id
            );
            if (!existingGroup) {
                setGroups((prevGroups) => [...prevGroups, data]);
            }
        })
        channel.bind('deleted', (data) => {
            if (selectedChat === data._id) {
                setSelectedChat(null);
            }
            setGroups((prevGroups) => prevGroups.filter(group => group._id !== data._id));
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [groups, selectedChat, setSelectedChat])

    return (
        <div className='sidebar-container'>
            <div className='sidebar-header'>
                <div className='sidebar-profile'>
                    <Avatar src={state.user.photoURL} />
                    <h2>{state.user.displayName}</h2>
                </div>
                <div>
                    <IconButton onClick={handleClearButtonClick} style={{ color: "white" }}>
                        <MoreVertOutlinedIcon />
                    </IconButton>
                    <Popover
                        open={Boolean(anchorElClear)}
                        anchorEl={anchorElClear}
                        onClose={handleClearClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleModal}>Add Group</MenuItem>
                        <MenuItem onClick={logout}>Log Out</MenuItem>
                    </Popover>
                </div>
            </div>
            {openModal && <Modal setOpenModal={setOpenModal} />}
            <div className='sidebar-body'>

                {groups.map((group) => (
                    <Chats key={group._id} id={group._id} name={group.name} handleChatClick={handleChatClick} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;