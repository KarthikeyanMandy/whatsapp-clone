import React, { useState } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import NoChat from './NoChat';

const Home = () => {

    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatClick = (chatId) => {
        setSelectedChat(chatId);
    };

    return (
        <div className='home-container'>
            <Sidebar handleChatClick={handleChatClick} setSelectedChat={setSelectedChat} selectedChat={selectedChat} />
            {selectedChat ? <Chat groupId={selectedChat} setSelectedChat={setSelectedChat} /> : <NoChat />}
        </div>
    )
}

export default Home;