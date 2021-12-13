module.exports = (http) => {
    const io = require('socket.io')(http, {
        cors: { origin: "http://localhost:3000", method: ["GET", "POST"] }
    });

    io.on("connection", socket => {
        console.warn(socket);
    });
}