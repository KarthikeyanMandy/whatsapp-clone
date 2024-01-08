import React from 'react';
import '../style.css';
import nochat from '../Images/homechat.png';

const NoChat = () => {
    return (
        <div className='nochat-container'>
            <img src={nochat} alt='error' />
            <h1>Welcome to Whatsapp Web</h1>
        </div>
    )
}

export default NoChat;