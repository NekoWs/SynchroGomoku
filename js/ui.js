function id(i) {
    return document.getElementById(i)
}

const alert_clone = id("alert").cloneNode(true)
const learning_mask = id("learning-mask")
id("alert").remove()

HTMLElement.prototype.$ = function (selectors) {
    return this.querySelector(selectors)
}

function alert(content, title=i18n("notice"), close=(()=>{})) {
    const clone = alert_clone.cloneNode(true)
    clone.$(".input-box").remove()
    clone.$(".button-box").remove()
    clone.$(".close-btn").onclick = () => {
        close()
        clone.classList.remove("show")
        setTimeout(() => {
            clone.remove()
        }, 300)
    }
    let t = clone.$(".title")
    t.innerText = title.replaceAll("\n", "\\n")
    let text = t.innerText
    t.innerHTML = text.replaceAll("\\n", "<br/>")
    clone.$(".content").innerText = content
    document.body.appendChild(clone)
    setTimeout(() => {
        clone.classList.add("show")
    }, 10)
    return clone
}

async function prompt(title, content, placeholder="", submit=((_) => { return true}), closeable=true) {
    const clone = alert_clone.cloneNode(true)
    clone.$(".title").innerText = title
    clone.$(".content").innerText = content
    clone.$(".input").value = placeholder;
    let r
    let promise = new Promise((resolve) => {
        r = resolve
    })
    function close() {
        clone.classList.remove("show")
        setTimeout(() => {
            clone.remove()
        }, 300)
        r()
    }
    clone.$(".close-btn").onclick = close
    if (!closeable) {
        clone.$(".close-btn").remove()
    }
    clone.$(".input").onkeydown = (e) => {
        if (e.key === "Enter") {
            clone.$(".submit-btn").click()
        }
    }
    clone.$(".submit-btn").onclick = () => {
        if (submit(clone.$(".input").value)) {
            r(clone.$(".input").value)
            close()
        } else {
            clone.$(".input").classList.add("warn")
            setTimeout(() => {
                clone.$(".input").classList.remove("warn")
            }, 300)
        }
    }
    clone.$(".button-box").remove()
    document.body.appendChild(clone)
    setTimeout(() => {
        clone.classList.add("show")
    }, 10)
    return await promise
}

async function confirm(title, content) {
    const clone = alert_clone.cloneNode(true)
    clone.$(".input-box").remove()
    let resolve;
    let promise = new Promise((r) => {
        resolve = r
    })
    const close = () => {
        clone.classList.remove("show")
        setTimeout(() => {
            clone.remove()
        }, 300)
    }
    clone.$(".close-btn").onclick = () => {
        resolve(false)
        close()
    }
    clone.$(".yes-btn").onclick = () => {
        resolve(true)
        close()
    }
    clone.$(".no-btn").onclick = () => {
        clone.$(".close-btn").click()
    }
    clone.$(".title").innerText = title
    clone.$(".content").innerText = content
    document.body.appendChild(clone)
    setTimeout(() => {
        clone.classList.add("show")
    }, 10)
    return promise
}

function syncAlert(content, title=i18n("notice")) {
    let resolve
    let promise = new Promise((r) => {
        resolve = r
    })
    alert(content, title, () => {
        resolve()
    })
    return promise
}

function showTips(target, content, outline=true) {
    learning_mask.classList.add("show")
    target.classList.add("highlight")
    target.classList.toggle("no-outline", !outline)
    let resolve
    let promise = new Promise(r => {
        resolve = r
    })
    let w = alert("", content, () => {
        learning_mask.classList.remove("show")
        target.classList.add("closing")
        setTimeout(() => {
            target.classList.remove("highlight")
            target.classList.remove("no-outline")
            target.classList.remove("closing")
            w.classList.remove("tips")
        }, 201)
        resolve()
    })
    w.classList.add("tips")
    let tips = w.querySelector(".main")
    let max_width = window.innerWidth
    let max_height = window.innerHeight
    let width = tips.offsetWidth
    let height = tips.offsetHeight
    let top = target.offsetTop + target.offsetHeight + 5
    let left = target.offsetLeft
    let bottom = max_height - (top + height + 5)
    left += Math.min(max_width - (left + width + 5), 0)
    left = Math.max(left, 5)
    if (bottom < 0) {
        tips.style.bottom = max_height - target.offsetTop + 5 + "px"
        tips.style.top = "auto"
    } else {
        tips.style.top = top + "px"
    }
    tips.style.left = left + "px"
    return promise
}