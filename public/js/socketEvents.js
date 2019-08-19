const socket = io.connect('http://localhost:3000');

//scroll
const getTotalHeight = (messages) => {
    let totalHeight = 0;
    messages.each((i, v) => {
        totalHeight += $(v).find("p").outerHeight(true);
    });

    console.log(totalHeight)
    return totalHeight;
}

const scrollChat = () => {
    const chat_messages_box = $("#chat_messages");
    const messages = $("#chat_messages").find("li");
    const contentHeight = getTotalHeight(messages);
    const shouldScroll = chat_messages_box.scrollTop() + chat_messages_box.innerHeight() < contentHeight;
    if (shouldScroll) {
        chat_messages_box.scrollTop(contentHeight);
    }
}


//events 
socket.on('new_message', (data) => {
    let msg_side = "";
    if (data.username !== sessionStorage.getItem('user')) {
        msg_side = "message-left";
    } else {
        msg_side = "message-right";
    }

    let msg = "<p class='" + msg_side + "'><i class='user'>" + data.username + "</i><i class='text'> " + data.message + "</i>" + " <i class='time'>" + data.time + "</i></p>";
    $("#chat_messages").append($("<li class='message'>").html(msg));
    scrollChat();
});

socket.on('typing', (data) => {
    if (data.username !== sessionStorage.getItem('user')) {
        let msg = "<i class='typing'>" + data.username + " is typing..." + "</i>";
        $("#typing").html($("<p>").html(msg));
    } else {        
        $("#typing").html($("<p>").html(""));
    }

});

socket.on('not_typing', () => {
    $("#typing").find("p").remove();
});

socket.on('is_online', (data) => {
    //let msg = "<i class='time'>" + data.time + " </i><i class='user'> " + data.username + " joined the chat.</i>";
    $("#chat_messages").append($("<li class='joined'>").html(""));
})
