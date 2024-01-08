const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1728973",
    key: "797f0d735e0333002f5d",
    secret: "feeb8fee7512ced3c4ef",
    cluster: "ap2",
    useTLS: true
});

module.exports = pusher;