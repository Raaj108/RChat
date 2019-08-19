//scroll
const getTotalHeight = (messages) => {
    let totalHeight = 0;
    messages.each((i, v) => {
        totalHeight += $(v).find("p").outerHeight(true);
    });

    console.log(totalHeight)
    return totalHeight;
}

export const scrollChat = () => {
    const chat_messages_box = $("#chat_messages");
    const messages = $("#chat_messages").find("li");
    const contentHeight = getTotalHeight(messages);
    const shouldScroll = chat_messages_box.scrollTop() + chat_messages_box.innerHeight() < contentHeight;
    if (shouldScroll) {
        chat_messages_box.scrollTop(contentHeight);
    }
}
