Object.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this))
}

class Chess {
    chess = []
    size = 5

    constructor(element) {
        this.base = element
        this.reset(true)
    }

    /**
     * 清空当前棋盘所有棋子
     * @param deep 是否重置棋盘大小
     */
    reset(deep = false) {
        if (deep) {
            this.size = 5
        }
        this.empty = true
        this.chess = []
        last_place = []
        for (let i = 0; i < this.size; i++) {
            let col = []
            for (let j = 0; j < this.size; j++) {
                col.push(-1)
            }
            this.chess.push(col)
        }
        if (deep) {
            this.init()
        }
    }

    /**
     * 拓展棋盘，并将棋子进行移动
     */
    extend() {
        let line = []
        for (let i = 0; i < this.size; i++) {
            this.chess[i].push(-1)
            this.chess[i].unshift(-1)
            line.push(-1)
        }
        line.push(-1, -1)
        this.chess.push(line.clone())
        this.chess.unshift(line.clone())
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

    /**
     * 更新棋盘
     */
    update() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let box = this.boxes[i][j]
                let chess = this.chess[i][j]
                if (i === 2 && j === 2) {
                    box.classList.toggle("banned", this.empty)
                }
                this.empty = false
                box.classList.remove("p1", "p2", "p1-pre", "p2-pre", "strike", "last")
                if (last_place.length === 2) {
                    let pl = last_place[0], al = last_place[1]
                    if ((i === pl[0] && j === pl[1]) || (i === al[0] && j === al[1])) {
                        box.classList.add("last")
                    }
                }
                let chessBox = ""
                switch (chess) {
                    case 0:
                        chessBox = "p1"
                        break
                    case 1:
                        chessBox = "p2"
                        break
                    case 2:
                        chessBox = "p1-pre"
                        break
                    case 3:
                        chessBox = "p2-pre"
                        break
                    case 4:
                        chessBox = "strike"
                        break
                }
                if (chessBox !== "") {
                    box.classList.add(chessBox)
                }
            }
        }
    }

    /**
     * 逐个动画将棋子移除
     * @return {number} 动画播放完毕的延迟时间 (ms)
     */
    animationReset() {
        let boxes = []
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.chess[i][j] === -1) {
                    continue
                }
                let box = this.boxes[i][j]
                boxes.push(box)
            }
        }
        let delay = 0
        for (let box of boxes) {
            setTimeout(() => {
                setTimeout(() => {
                    box.classList.remove("p1", "p2", "p1-pre", "p2-pre", "strike", "last")
                }, 200)
                box.classList.add("closing")
            }, delay)
            delay += 20
        }
        return delay
    }

    /**
     * 棋盘点击事件
     * @param row 行
     * @param col 列
     * @param data 棋盘数据
     */
    click(row, col, data) {
        // 游戏结束或回放中点击棋盘
        if (over || replaying) {
            let o = over
            let delay = this.animationReset()
            setTimeout(() => {
                chess.reset(true)
            }, delay)
            resetOperate(false)
            if (o) {
                started = true
            }
            updateStatus()
            if (replaying) {
                stopReplay()
            }
            return
        }
        // 第一次落子禁止落子于中心
        if (this.empty && row === 2 && col === 2) {
            return
        }
        // 已经落子的位置不允许再次落子
        if (data !== -1) {
            return
        }
        // 未开始游戏或正在进行教程（教程会暂时性将 started 设置为 true）
        if (!started || learning) {
            return
        }
        if (pre_place.length !== 0 && (row === pre_place[0] && col === pre_place[1])) {
            return
        }
        send(ws, {mode: "place", x: row, y: col}).then(r => {
            if (r["code"] !== 200) {
                alert(r["message"])
                return
            }
            if (pre_place.length !== 0 && !this.isPass(pre_place)) {
                this.setChess(pre_place, -1, false)
            }
            pass = this.isPass([row, col])
            pre_place = [row, col]
            player_placed = true
            if (!pass) {
                this.setChess(pre_place, chess_color + 2)
            }
            updateStatus()
        })
        this.update()
    }

    /**
     * 判断一个 pos 是否为 PASS 操作
     * @param pos 操作位置
     * @returns {boolean} 是否为 PASS 操作
     */
    isPass(pos) {
        return pos[0] === -1 && pos[1] === -1
    }

    /**
     * 设置棋盘指定位置的棋子
     * @param pos 位置
     * @param data 棋子ID
     * @param update 是否更新棋盘
     */
    setChess(pos, data, update=true) {
        if (pos.length !== 2) throw Error("invalid pos")
        this.chess[pos[0]][pos[1]] = data
        if (update) {
            this.update()
        }
    }
}

let main = document.getElementById("chess-main")
let chess = new Chess(main)
