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
        "another-placed": "对方已落子"
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
    return languages[lang][key].format(obj)
}
let all = document.getElementsByTagName("i18n")
for (let i of all) {
    i.innerText = i18n(i.getAttribute("key"))
}