const socket = io("ws://localhost:8080");

socket.on("message", data => {
    const { id, msg } = data;
    const el = document.createElement("li");
    el.innerHTML = `
            <span class="user" style="background-color: ${getUserBg(id)}">${id}</span>
            <span class="msg">${msg}</span>
        `;
    document.querySelector("ul").appendChild(el);
});

let users = [];

socket.on("returnUsers", _users => users = _users);

function getUserBg(id) {
    const isColorUnique = color => {
        let isUnique = true;
        users.forEach(user => {
            if (user.bg == color) isUnique = false;
        });
        return isUnique;
    };
    const isUser = userId => {
        let isUser = false;
        let userData = {};
        users.forEach(_user => {
            if (_user.id == userId) {
                isUser = true;
                userData = _user;
            }
        });
        return [isUser, userData];
    };

    if (isUser(id)[0]) {
        return isUser(id)[1].bg;
    }

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    if (!isColorUnique(randomColor)) getUserBg(id);
    socket.emit("addUser", { id, bg: randomColor });
    console.log({users});

    return randomColor;
}

function onSend() {
    const text = document.querySelector("input").value;
    if (text && text !== "") {
        socket.emit("message", text);
        document.querySelector("input").value = "";
    }
}
