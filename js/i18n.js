let languages = {
    "zh-CN": {
        "welcome": "欢迎",
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
        "invite-title": "扫描二维码或复制链接来加入！"
    },
    "en-US": {
        "welcome": "Welcome",
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
        "invite-title": "Use the QR or link to join!"
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
function i18n(key, ...obj) {
    return languages[lang][key].format(obj)
}
let all = document.getElementsByTagName("i18n")
for (let i of all) {
    i.innerText = i18n(i.getAttribute("key"))
}