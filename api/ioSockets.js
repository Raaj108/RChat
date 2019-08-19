const socketio = require('socket.io');
const time = require('./getTime.js');

module.exports.listen = (app) => {
    io = socketio.listen(app)

    io.sockets.on('connection', (socket) => {
        console.log("Socket connection successful : " + time.getTime())

        socket.username = "Anonymous";

        socket.on('user_connect', (username) => {
            socket.username = username ? username : socket.username;
            let data = {
                username: username,
                time: time.getTime()
            }
            console.log(socket.username + " connected at " + time.getTime());
            io.emit('is_online', data);
        });

        socket.on('new_message', (data) => {
            let msg = {
                message: data.message,
                username: socket.username,
                time: time.getTime()
            }
            io.emit('new_message', msg)
        });

        socket.on('typing', (data) => {
            io.emit('typing', {
                username: socket.username
            });
        });

        socket.on('not_typing', () => {
            io.emit('not_typing');
        });

    });

    return io;
}
