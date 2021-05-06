const http = require("http").createServer();

const io = require("socket.io")(http, {
    cors: { origin: "*" },
});

let users = [];

io.on("connection", socket => {
    console.log("connection to a user established");
    socket.on("message", message => {
        io.emit("message", { id: socket.id.substr(0, 2), msg: message });
    });

    socket.on("addUser", ({ id, bg }) => {
        const isUser = userId => {
            let isUser = false;
            users.forEach(_user => {
                if (_user.id == userId) {
                    isUser = true;
                }
            });
            return isUser;
        };
        if (!isUser(id)) users.push({ id, bg });
        socket.emit("returnUsers", users);
    });

    socket.on("getUsers", () => {
        socket.emit("returnUsers", users);
    });
});

http.listen(8080, () => console.log("listening on htto://localhost:8080"));
