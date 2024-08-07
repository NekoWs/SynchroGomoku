const loadSearch = (str) => {
    let re = {};
    if (str) {
        let a = str.replace("?", "").split("&");
        for (let i in a) {
            let b = a[i].split("=");
            re[b[0]] = decodeURIComponent(b[1]);
        }
    }
    return re;
}
const search = (() => {
    let out = "";
    let href = location.href;
    let index = href.indexOf("?");
    if (index === -1) return out;
    return href.substring(index);
})();

const $_GET = loadSearch(search);
let handlers = []

function send(ws, params) {
    const handler = handlers.length
    ws.send(JSON.stringify({"handler": handler, ...params}))
    return new Promise((resolve, reject) => {
        handlers.push([resolve, reject])
    })
}

const p1_name = id("p1-name")
const p2_name = id("p2-name")
const room_id = id("room-id")
const strike_count = id("strike-count")
let last_place = []
let replaying = false
let history, strike, over, pre_place, started, pass, extend
let chess_color = 0
let another_color = 1
let another_placed = false
let player_placed = false
let player_status, another_status;
let player_pass_e, another_pass_e;
let player_pass = 0, another_pass = 0;
let player_name, another_name, heart_handle, status, room, ws;
let sounds = {}

function placed(data) {
    player_status.classList.remove("placed")
    another_status.classList.remove("placed")
    player_placed = false
    another_placed = false
    const x = data["x"]
    const y = data["y"]
    let sound = "place"
    const ap = x === -1 && y === -1
    last_place = [pre_place, [x, y]]
    if (!replaying) {
        history.push(last_place)
    }
    if (pass) {
        player_pass++
    } else {
        chess.chess[pre_place[0]][pre_place[1]] = chess_color
    }
    if (ap) {
        another_pass++
        if (pass) {
            sound = "strike"
        }
    } else {
        if (pre_place[0] === x && pre_place[1] === y && !pass) {
            chess.chess[x][y] = 4
            sound = "strike"
        } else {
            chess.chess[x][y] = another_color
        }
    }
    if (extend) {
        sound = "extend"
        chess.extend()
        for (let i = 0; i < last_place.length; i ++) {
            for (let j = 0; j < last_place[i].length; j ++) {
                last_place[i][j] ++
            }
        }
        extend = false
    }
    pre_place = []
    pass = false
    play_sound(sound)
    chess.update()
    updateStatus()
}

function play_sound(name) {
    let audio
    if (!sounds[name]) {
        audio = document.createElement("AUDIO")
        audio.src = "./res/" + name + ".mp3"
        sounds[name] = audio
    } else {
        audio = sounds[name]
    }
    audio.currentTime = 0
    audio.play()
}

function resetOperate(placed=true) {
    pass = false
    strike = 0
    over = false
    pre_place = []
    started = false
    extend = false
    player_pass = 0
    another_pass = 0
    history = [{"colors": {0: chess_color, 1: another_color}}]
    if (placed) {
        player_placed = false
        another_placed = false
    }
}

function reconnect() {
    setTimeout(() => {
        if (document.getElementsByClassName("window").length > 0) {
            return
        }
        connect()
    }, 301)
}

function connect() {
    try {
        ws = new WebSocket("wss://gomoku.cc:4000")
        ws.onopen = () => {
            send(ws, {"mode": "version"}).then(r => {
                console.log(r["message"])
            })
            let storageName = localStorage.getItem("name")
            prompt("Welcome", "Please input your name: ", storageName || "", name => {
                return !!name
            }, false).then(name => {
                if (name && typeof name == 'string') {
                    localStorage.setItem("name", name)
                }
                send(ws, {"mode": "login", "name": name}).then(r => {
                    if (r["code"] !== 200) {
                        alert(r["message"], "Warn", reconnect)
                        return
                    }
                    resetOperate(true)
                    heart_handle = setInterval(() => {
                        send(ws, {"mode": "heart"}).then(r => {
                            if (r["code"] !== 200) {
                                alert("Disconnected form the server...", "Disconnected", reconnect)
                                clearInterval(heart_handle)
                                connect()
                            }
                        })
                    }, 20000)
                    room = r["message"]
                    status = r["status"]
                    started = r["started"]
                    pre_place = r["placed"]
                    player_placed = pre_place.length !== 0
                    player_name = r["name"]
                    player_pass = r["passes"][0]
                    if (r["last_places"]) {
                        last_place = r["last_places"]
                    }
                    if (r["passes"].length === 2) {
                        another_pass = r["passes"][1]
                    }
                    another_placed = r["another_placed"] || false
                    if (r["chess"]) {
                        chess.reset(true)
                        let size = r["chess"].length
                        while (chess.size < size) {
                            chess.extend()
                        }
                        chess.chess = r["chess"]
                    } else {
                        chess.reset(true)
                    }
                    if (pre_place.length !== 0) {
                        const row = pre_place[0]
                        const col = pre_place[1]
                        pass = row === -1 && col === -1
                        if (!pass) {
                            chess.chess[row][col] = chess_color + 2
                        }
                    }
                    if ($_GET["room"]) {
                        join_room($_GET["room"])
                    }
                    updateStatus()
                    console.log(`Joined room: ${room}`)
                })
            })
        }
        ws.onmessage = e => {
            try {
                const data = JSON.parse(e.data)
                const handler = data["handler"] || 0
                if (handler === -1) {
                    if (!data["mode"]) {
                        console.error("invalid handler", data)
                        return
                    }
                    const mode = data["mode"]
                    switch (mode) {
                        case "placed":
                            placed(data)
                            return
                        case "offline":
                            alert("Another client login", "Warn", reconnect)
                            return
                        case "player-joined":
                            const name = data["name"]
                            status = data["status"]
                            started = true
                            updateStatus()
                            console.log(`Player ${name} joined!`)
                            return
                        case "another-placed":
                            another_placed = true
                            updateStatus()
                            console.log("Another placed!")
                            return
                        case "extend":
                            extend = true
                            history.push(["extend"])
                            chess.update()
                            console.log("Chess extend")
                            return
                        case "over":
                            const winner = data["winner"]
                            const winner_name = winner === chess_color ? player_name : another_name
                            if (winner === 3) {
                                alert("Draw.", "Game Over")
                                console.log("draw.")
                            } else {
                                alert(`${winner_name} win!`, "Game Over")
                                console.log(`${winner_name} win.`)
                            }
                            over = true
                            player_placed = false
                            another_placed = false
                            updateStatus()
                            return
                        case "strike":
                            strike = data["count"]
                            strike_count.innerText = strike
                            return
                        case "reset":
                            room = data["room"]
                            status = [player_name]
                            resetOperate(true)
                            chess.reset(true)
                            updateStatus()
                            alert("The room has been reset", "Reset")
                            return
                        case "leave":
                            status = [player_name]
                            alert(`${another_name} leaved`, "Leave")
                            resetOperate(true)
                            chess.reset(true)
                            updateStatus()
                    }
                    return
                }
                if (handlers.length < handler) {
                    console.error("invalid handler", data)
                    return
                }
                handlers[handler][0](data)
                handlers[handler] = null
                let clear = true
                for (let i = 0; i < handlers.length; i ++) {
                    if (handlers[i] !== null) {
                        clear = false
                        break
                    }
                }
                if (clear) {
                    handlers = []
                }
            } catch (e) {
                console.error(e)
            }
        }
        ws.onclose = () => {
            alert("Disconnected from the server...", "Disconnected", reconnect)
            clearInterval(heart_handle)
        }
    } catch (e) {
        alert("Couldn't connect to server!", "ERROR", reconnect)
        console.error(e)
    }
}

connect()

function updateStatus() {
    p1_name.innerText = status[0]
    if (status.length === 2) {
        p2_name.innerText = status[1]
    } else {
        p2_name.innerText = "NO PLAYER"
    }
    const index_player = player_name === status[0]
    chess_color = status.indexOf(player_name)
    another_color = index_player ? 1 : 0
    another_name = index_player ? status[1] : status[0]
    let p1s = id("p1-status")
    let p2s = id("p2-status")
    player_status = index_player ? p1s : p2s
    another_status = index_player ? p2s : p1s
    player_status.classList.add("self")
    another_status.classList.remove("self")
    player_status.classList.toggle("placed", player_placed)
    another_status.classList.toggle("placed", another_placed)
    another_status.classList.toggle("offline", !another_name)
    strike_count.innerText = strike
    let p1p = id("p1-pass")
    let p2p = id("p2-pass")
    player_pass_e = index_player ? p1p : p2p
    another_pass_e = index_player ? p2p : p1p
    player_pass_e.innerText = player_pass
    another_pass_e.innerText = another_pass
    room_id.innerText = room
    chess.update()
}

function join_room(id) {
    send(ws, {"mode": "join", "room": id}).then(r => {
        if (r["code"] !== 200) {
            alert(r["message"])
            return
        }
        room = id
        status = r["status"]
        started = true
        chess.reset(true)
        chess.update()
        updateStatus()
        console.log("Joined room: " + id)
    })
}

id("join").onclick = () => {
    prompt("Join a new room?", "Please input the room id: ", "", value => {
        return !!value
    }).then(id => {
        if (!id) {
            return
        }
        join_room(id)
    })
}

id("pass-btn").onclick = () => {
    chess.click(-1, -1, -1)
}

id("reset").onclick = () => {
    confirm("Reset", "Oops! Would you want to RESET the room?").then(bool => {
        if (!bool) return
        send(ws, {"mode":"reset"}).then(r => {
            if (r["code"] === 200) {
                status = [player_name]
                resetOperate()
                chess.reset(true)
                updateStatus()
                alert("The room has been reset", "Reset")
            }
        })
    })
}

id("replay").onclick = () => {
    prompt("Replay", "Please input play data: ").then(s => {
        let data
        try {
            data = JSON.parse(s)
        } catch (e) {
            alert("Invalid data")
            return
        }
        chess.reset(true)
        chess.update()
        replaying = true
        let starting = started
        started = false
        let delay = 1000
        let d = 0
        let options = data[0]
        let colors = options["colors"]
        let extend = false
        for (let i = 1; i < data.length; i ++) {
            let place = data[i]
            let extend = data[i][0] === "extend"
            if (!extend) {
                d += delay
            }
            setTimeout(() => {
                if (place.length === 1) {
                    switch (place[0]) {
                        case "over":
                            last_place = []
                            pre_place = []
                            replaying = false
                            over = true
                            started = starting
                            return
                        case "extend":
                            chess.extend()
                            chess.update()
                            return
                    }
                    return
                }
                last_place = place
                let ap
                if (colors[0] === chess_color) {
                    pre_place = place[0]
                    ap = place[1]
                } else {
                    pre_place = place[1]
                    ap = place[0]
                }
                pass = pre_place[0] === -1 && pre_place[1] === -1
                placed({x: ap[0], y: ap[1]})
            }, d)
        }
    })
}