Object.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this))
}
class Chess {
    chess = []
    backup = []
    size = 5

    constructor(element) {
        this.base = element
        this.reset(true)
    }

    reset(deep=false) {
        if (deep) {
            this.size = 5
        }
        this.empty = true
        this.chess = []
        for (let i = 0; i < this.size; i++) {
            let col = []
            for (let j = 0; j < this.size; j++) {
                col.push(-1)
            }
            this.chess.push(col)
        }
        if (deep) {
            this.backup = JSON.parse(JSON.stringify(this.chess))
            this.init()
        }
    }

    extend() {
        let line = []
        for (let i = 0; i < this.size; i ++) {
            this.chess[i].push(-1)
            this.backup[i].push(-1)
            this.chess[i].unshift(-1)
            this.backup[i].unshift(-1)
            line.push(-1)
        }
        line.push(-1, -1)
        this.chess.push(line.clone())
        this.backup.push(line.clone())
        this.chess.unshift(line.clone())
        this.backup.unshift(line.clone())
        this.size += 2
        this.init()
    }

    init() {
        this.base.innerHTML = ""
        this.chess_index = document.createElement("DIV")
        this.chess_index.classList.add("chess-index")
        this.base.appendChild(this.chess_index)
        this.boxes = []

        for (let i = 0; i < this.chess.length; i++) {
            let col = document.createElement("DIV")
            col.classList.add("chess-col")
            if (i === 0) {
                col.classList.add("only-click")
            }
            if (i === 1) {
                col.classList.add("first")
            }
            if (i === this.chess.length - 1) {
                col.classList.add("last")
            }
            let col_boxes = []
            for (let j = 0; j < this.size; j++) {
                let box = document.createElement("DIV")
                box.classList.add("chess-box")
                let middle = document.createElement("span")
                middle.classList.add("middle")
                box.appendChild(middle)
                if (j === 0) {
                    box.classList.add("only-click")
                }
                if (j === 1) {
                    box.classList.add("first")
                }
                if (this.chess[i][j] === 0) {
                    box.classList.add("p1")
                } else if (this.chess[i][j] === 1) {
                    box.classList.add("p2")
                }
                col.appendChild(box)
                box.addEventListener("click", e => {
                    this.click(i, j, this.chess[i][j])
                    e.preventDefault()
                })
                col_boxes.push(box)
            }
            this.boxes.push(col_boxes)
            this.chess_index.appendChild(col)
        }
    }

    update() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let box = this.boxes[i][j]
                let chess = this.chess[i][j]
                if (i === 2 && j === 2) {
                    box.classList.toggle("banned", this.empty)
                }
                if (this.backup[i][j] === this.chess[i][j]) {
                    continue
                }
                this.empty = false
                box.classList.remove("p1", "p2", "p1-pre", "p2-pre", "strike", "last")
                if (last_place.length === 2) {
                    let pl = last_place[0], al = last_place[1]
                    if ((i === pl[0] && j === pl[1]) || (i === al[0] && j === al[1])) {
                        box.classList.add("last")
                    }
                }
                switch (chess) {
                    case 0:
                        box.classList.add("p1")
                        continue
                    case 1:
                        box.classList.add("p2")
                        continue
                    case 2:
                        box.classList.add("p1-pre")
                        continue
                    case 3:
                        box.classList.add("p2-pre")
                        continue
                    case 4:
                        box.classList.add("strike")
                        continue
                }
                this.backup[i][j] = this.chess[i][j]
            }
        }
    }

    click(row, col, data) {
        if (over) {
            chess.reset(true)
            resetOperate(false)
            updateStatus()
            started = true
            return
        }
        if (this.empty && row === 2 && col === 2) {
            return
        }
        if (data !== -1) {
            return
        }
        if (!started) {
            return
        }
        if (pre_place.length !== 0) {
            return
        }
        send(ws, {mode: "place", x: row, y: col}).then(r => {
            if (r["code"] !== 200) {
                alert(r["message"])
                return
            }
            pass = row === -1 && col === -1
            if (!pass) {
                this.chess[row][col] = chess_color + 2
            }
            pre_place = [row, col]
            player_placed = true
            this.update()
            updateStatus()
        })
        this.update()
    }
}
let main = document.getElementById("chess-main")
let chess = new Chess(main)