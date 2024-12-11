function startLearning() {
    confirm(i18n("learn-title"), i18n("learn-content")).then(async c => {
        if (!c) {
            localStorage.setItem("visited", "1")
            connect()
            return
        }
        learning = true
        await preface()
    })
}

let learning = false

const players_box = id("players-box")

async function preface() {
    player_name = i18n("your-name")
    room = "10000"
    status = [player_name]
    started = false
    pre_place = []
    player_placed = false
    player_pass = 0
    another_placed = false
    strike = 0
    updateStatus()

    await syncAlert(i18n("game-tips"), i18n("game-rule"))
    await syncAlert(i18n("draw-judge"), i18n("draw-judge-title"))
    await ui_learn()
}
async function ui_learn() {
    await showTips(players_box, i18n("players-box-tips"))
    await showTips(id("join"), i18n("join-btn-tips"), false)
    await showTips(id("reset"), i18n("reset-btn-tips"), false)
    await showTips(id("leave"), i18n("leave-btn-tips"), false)
    await showTips(id("replay"), i18n("replay-btn-tips"), false)
    await showTips(room_id, i18n("room-id-tips"))
    await showTips(invite_qrcode, i18n("invite-qrcode-tips"))

    started = true
    another_name = i18n("another-name")
    status.push(another_name)
    updateStatus()
    await showTips(players_box, i18n("player-join-tips"))
    await showTips(strike_count, i18n("strike-tips"))
    await showTips(id("pass-btn"), i18n("pass-btn-tips"), false)
    await showTips(id("chess-main").$(".chess-index"), i18n("chess-tips"))
    localStorage.setItem("visited", "1")
    alert(i18n("learning-over"), i18n("learn-title"), () => {
        location.reload()
    })
}