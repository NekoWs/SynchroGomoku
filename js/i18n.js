let languages = {
    "zh-CN": {
        "welcome": "欢迎！",
        "input-name": "请输入你的昵称：",
        "reset": "重置",
        "reset-message": "请确认是否要重置房间？",
        "now-in": "房间号：",
        "strike-before": "碰撞次数：",
        "strike-after": "/10",
        "join-title": "加入一个新房间？",
        "join-message": "请输入房间号：",
        "another-leaved": "%s 离开了",
        "disconnected": "断开连接",
        "disconnected-message": "从服务器断开连接...",
        "joined-room": "已加入房间：%s",
        "another-login": "已在另一个客户端登录",
        "warn": "警告",
        "leave-message": "请确认是否要离开房间？",
        "leaved-room": "已离开房间",
        "player-leaved": "玩家 {0} 离开了房间！",
        "notice": "提示",
        "draw": "平局",
        "game-over": "游戏结束",
        "win": "游戏结束，{0} 获胜!",
        "room-rested": "该房间已重置！",
        "cannot-connect": "无法连接至服务器！",
        "error": "错误",
        "no-player": "无玩家",
        "invite-title": "扫描二维码或复制链接来加入！",
        "not-logged-in": "您尚未登录，请登录后再试！",
        "login-too-fast": "您的登录间隔太短，请稍后再试！",
        "already-logged-in": "您已经登录过了！",
        "invalid-request": "无效请求",
        "invalid-name": "无效昵称！",
        "name-already-exists": "该昵称已经存在！",
        "other-client-logged-in": "在其他设备登录",
        "room-is-full": "该房间已满！",
        "another-leave": "对方离开了房间",
        "room-not-found": "未找到该房间号！",
        "already-in-room": "你已经在这个房间里了！",
        "player-joined": "玩家加入！",
        "need-another-player": "需要另一名玩家以开始游戏！",
        "banned-chess": "不允许的落子！",
        "already-placed": "你已经落子过了！",
        "another-placed": "对方已落子",
        "learn-title": "教程",
        "learn-content": "嘿！看起来你是第一次玩《同步五子棋》，是否要开始规则介绍呢？",
        "game-rule": "游戏规则",
        "game-tips": [
            "下面先介绍该游戏的规则：",
            "1. 游戏玩法类似五子棋，但双方同时落子，在落子前无法得知对方落子位置",
            "2. 单独一方练成五子则为胜利",
            "3. 当双方落子位置相同，则视为「碰撞」",
            "4. 「碰撞」后的位置此后将无法落子",
            "5. 玩家可以选择 PASS 跳过本次落子，但若双方同时 PASS，则也视为一次「碰撞」",
            "6. 棋盘初始大小为 5 × 5，当双方棋子均落于棋盘边缘过，则棋盘向外扩展一圈，最大为 15 × 15",
            "7. 第一手禁止落于棋盘中心位置"
        ],
        "draw-judge-title": "平局判定",
        "draw-judge": [
            "当达成以下任意一种情况，且没有玩家单独连成五子时，",
            "将会根据 PASS 次数判定胜负，若 PASS 次数相同则判定为平局：",
            "1. 发生 10 次「碰撞」时",
            "2. 棋盘无可落子位置时",
            "3. 双方同时连成五子时"
        ],
        "your-name": "你的名字",
        "another-name": "对方",
        "players-box-tips": [
            "这是玩家栏，你的名字的左方棋子为你的棋子颜色",
            "棋子左下角的圆点是 “状态指示器”，分别有四种状态：",
            "蓝色:自己 粉色:对方 绿色:已落子 灰色:无玩家",
            "你的名字下面的数字是你的 PASS 次数"
        ],
        "join-btn-tips": "加入，即通过房间号来加入一个房间",
        "reset-btn-tips": "重置，即将对局重置，即将棋盘、双方 PASS 次数、碰撞次数重置",
        "leave-btn-tips": "退出，即离开当前房间",
        "replay-btn-tips": "回放，通过将 history 填入实现自动播放，暂未完成",
        "strike-tips": "碰撞次数，在这里会显示本局的碰撞次数和上限",
        "pass-btn-tips": "PASS，即跳过本回合并使 PASS 次数 + 1",
        "room-id-tips": "这个是当前的房间号，每次进入游戏都会为你分配一个房间号",
        "invite-qrcode-tips": "也可以通过扫描二维码快捷加入游戏！",
        "player-join-tips": "当另一名玩家加入房间后游戏会自动开始，棋盘则会出现",
        "chess-tips": [
            "棋盘，另外，落子机会只有一次，在落子之后不能改变本次落子的位置",
            "PASS 同理"
        ],
        "learning-over": "那么到此，教程就算结束了，接下来开始叫上你的伙伴一起玩吧！"
    },
    "en-US": {
        "welcome": "Welcome!",
        "input-name": "Please key in your nickname: ",
        "reset": "Reset",
        "reset-message": "Do you confirm to reset the room?",
        "now-in": "Room ID: ",
        "strike-before": "Strike count: ",
        "strike-after": "/10",
        "join-title": "Another room?",
        "join-message": "Please input the room id: ",
        "disconnected": "Disconnected",
        "disconnected-message": "Disconnected from server...",
        "another-login": "Another client login.",
        "warn": "Warn",
        "leave-message": "Do you confirm to leave the room?",
        "leaved-room": "Leaved the room.",
        "player-leaved": "Player {0} leaved.",
        "notice": "Notice",
        "draw": "Draw",
        "game-over": "Game Over",
        "win": "Game Over, {0} win!",
        "room-rested": "This room has been reset",
        "cannot-connect": "Cannot connect to server!",
        "error": "Error",
        "no-player": "No Player",
        "invite-title": "Use the QR or link to join!",
        "not-logged-in": "Not logged in",
        "login-too-fast": "Login too fast, please try again later!",
        "already-logged-in": "Already logged in",
        "invalid-request": "Invalid Request",
        "invalid-name": "Invalid Name",
        "name-already-exists": "Name already exists",
        "other-client-logged-in": "Remote login",
        "room-is-full": "Room is full!",
        "another-leave": "Other side leaved",
        "room-not-found": "Room not found!",
        "already-in-room": "You are already in this room!",
        "player-joined": "Player joined!",
        "need-another-player": "Need another player to start!",
        "banned-chess": "Not allowed chess!",
        "already-placed": "You are already placed in!",
        "another-placed": "Other side placed in!",
        "learn-title": "Tutorial",
        "learn-content": "Hey! It looks like this is your first time playing < Synchro Gomoku >. Do you want to start the tutorial?",
        "game-rule": "Game rule",
        "game-tips": [
            "Rules:",
            "1. Similar to Gomoku; both players move simultaneously without knowing the other's move.",
            "2. Forming a line of five wins.",
            "3. Same position results in a 'strike', making it unavailable.",
            "4. Both PASS simultaneously = 'strike'.",
            "5. Board starts at 5 × 5, expands to max 15 × 15 when edges are occupied.",
            "6. First move cannot be at the center."
        ],
        "draw-judge-title": "Draw Conditions",
        "draw-judge": [
            "Draw occurs if no one forms five in a row and:",
            "1. 10 collisions.",
            "2. No available moves.",
            "3. Both form five simultaneously."
        ],
        "your-name": "Your Name",
        "another-name": "Opponent",
        "players-box-tips": [
            "Player box shows your piece color and status:",
            "Blue: You, Pink: Opponent, Green: Placed, Gray: Empty.",
            "Number below your name = PASS count."
        ],
        "join-btn-tips": "Join a room using a room ID.",
        "reset-btn-tips": "Reset game (board, PASS, collisions).",
        "leave-btn-tips": "Leave the room.",
        "replay-btn-tips": "Replay game history (in progress).",
        "strike-tips": "Collision count and max limit.",
        "pass-btn-tips": "PASS to skip a turn (+1 PASS count).",
        "room-id-tips": "Room ID assigned when entering.",
        "invite-qrcode-tips": "Join via QR code!",
        "player-join-tips": "Game starts when another player joins.",
        "chess-tips": [
            "Board: Place pieces once, no changes after.",
            "PASS works the same."
        ],
        "learning-over": "Tutorial complete. Invite friends and play!"
    }
}
String.prototype.format = function() {
    let formatted = this;
    for(const arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
let lang = navigator.language
lang = languages[lang] ? lang : "en-US"
document.documentElement.lang = lang
function i18n(key, ...obj) {
    let lan = languages[lang][key]
    if (typeof(lan) !== 'string') {
        let str = ""
        for (let i of lan) {
            str += i + "\n"
        }
        return str.substring(0, str.lastIndexOf("\n"))
    }
    return languages[lang][key].format(obj)
}
let all = document.getElementsByTagName("i18n")
for (let i of all) {
    i.innerText = i18n(i.getAttribute("key"))
}