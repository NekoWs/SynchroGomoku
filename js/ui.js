function id(i) {
    return document.getElementById(i)
}

const alert_clone = id("alert").cloneNode(true)
id("alert").remove()

HTMLElement.prototype.$ = function (selectors) {
    return this.querySelector(selectors)
}

function alert(content, title="Info", close=(()=>{})) {
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
    clone.$(".title").innerText = title
    clone.$(".content").innerText = content
    document.body.appendChild(clone)
    setTimeout(() => {
        clone.classList.add("show")
    }, 1)
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
    }, 1)
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
    }, 1)
    return promise
}