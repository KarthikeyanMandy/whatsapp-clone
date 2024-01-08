import React, { useState } from 'react'
import service from '../service';

const Modal = ({ setOpenModal }) => {

    const [value, setValue] = useState({ groupName: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const createGroup = async (e) => {
        e.preventDefault();
        if (value.groupName) {
            try {
                const response = await service.newGroup(value);
                console.log(response);
                setValue((prevValue) => ({ ...prevValue, groupName: "" }));
                setOpenModal(false)
            } catch (error) {
                console.log("Something went wrong", error);
            }
        }
    }

    return (
        <div className='modal-container'>
            <div className='close-btn'>
                <button onClick={() => { setOpenModal(false); }}>X</button>
            </div>
            <form autoComplete='off'>
                <input
                    type='text'
                    placeholder='Add group'
                    name='groupName'
                    value={value.groupName}
                    onChange={handleChange}
                />
                <button onClick={createGroup}>Save</button>
            </form>
        </div>
    )
}

export default Modal;