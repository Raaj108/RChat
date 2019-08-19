$(document).ready(() => {

    const message = $("#message");
    const popup = $(".pop-up-container");
    const usernameForm = $("#popupForm");
    const chatroom = $("#chatroom");
    const chatform = $("#chatform");
    const chat_messages_box = $("#chat_messages");

    const store = (username) => {
        sessionStorage.setItem('user', username);
    }

    usernameForm.on("submit", (e) => {
        e.preventDefault();
        const username = $("#username").val();
        socket.emit('user_connect', username);
        popup.css('display', 'none');
        chatroom.css('display', 'block');
        if (!sessionStorage.getItem('user')) {
            store(username);
        }
        $("#user").html(username);
    });

    chatform.on("submit", (e) => {
        e.preventDefault();
        socket.emit('new_message', {
            message: message.val()
        });
        message.val('');

        return false;
    });

    message.on('keypress', (e) => {
        socket.emit('typing');
    });

    message.on('blur', (e) => {
        socket.emit('not_typing');
    });

});
