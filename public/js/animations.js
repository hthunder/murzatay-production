export const slideUp = (target, duration) => {
    const styleObj = {
        transitionProperty: "height, margin, padding",
        transitionDuration: `${duration}ms`,
        boxSizing: "border-box",
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        overflow: "hidden",
    }
    Object.entries(styleObj).forEach(([key, val]) => {
        target.style[key] = val
    })
    window.setTimeout(() => {
        target.style.display = "none"
        const removedProps = [
            "height",
            "padding-top",
            "padding-bottom",
            "margin-top",
            "margin-bottom",
            "overflow",
            "transition-duration",
            "transition-property",
        ]
        removedProps.forEach((prop) => {
            target.style.removeProperty(prop)
        })
    }, duration)
}

export const slideDown = (target, duration) => {
    target.style.removeProperty("display")
    let { display } = window.getComputedStyle(target)
    if (display === "none") {
        display = "block"
    }
    target.style.display = display
    const styleObj = {
        overflow: "hidden",
        boxSizing: "border-box",
        transitionProperty: "height, margin, padding",
        transitionDuration: `${duration}ms`,
        height: `${target.offsetHeight}px`,
    }
    Object.entries(styleObj).forEach(([key, val]) => {
        target.style[key] = val
    })
    window.setTimeout(() => {
        const removedPropsAsync = [
            "height",
            "overflow",
            "transition-duration",
            "transition-property",
        ]
        removedPropsAsync.forEach((prop) => {
            target.style.removeProperty(prop)
        })
    }, duration)
}

export const slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
        return slideDown(target, duration)
    }
    return slideUp(target, duration)
}

export function fadeOut(el) {
    el.style.opacity = 1
    ;(function fade() {
        el.style.opacity -= 0.1
        if (el.style.opacity <= 0) {
            el.style.display = "none"
            el.style.opacity = null
        } else {
            requestAnimationFrame(fade)
        }
    })()
}

export function fadeIn(el, display) {
    el.style.opacity = 0
    el.style.display = display || "block"
    ;(function fade() {
        let val = parseFloat(el.style.opacity)
        val += 0.1
        if (!(val > 1)) {
            el.style.opacity = val
            requestAnimationFrame(fade)
        }
    })()
}
