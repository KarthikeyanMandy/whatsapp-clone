import instance from "./axios";

const service = {
    newGroup: (value) => {
        return instance.post('/newgroup', value)
    },
    allGroup: () => {
        return instance.get('/allgroup')
    },
    oneGroup: (value) => {
        return instance.get(`/onegroup?id=${value}`)
    },
    deleteGroup: (value) => {
        return instance.delete(`deletegroup?id=${value}`)
    },
    newMessage: (value) => {
        return instance.post('/newmessage', value)
    },
    allMessage: (value) => {
        return instance.get(`/allmessage?id=${value}`)
    },
    deleteMessage: (value) => {
        return instance.delete(`/deletemessage?id=${value}`)
    },
    deleteAllMessage: (value) => {
        return instance.delete(`/deleteallmessage?id=${value}`)
    }
}

export default service;