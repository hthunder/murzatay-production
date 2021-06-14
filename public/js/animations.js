export const slideUp = (target, duration) => {
    /* Sliding-up logic */
    target.style.transitionProperty = "height, margin, padding"
    target.style.transitionDuration = `${duration}ms`
    target.style.boxSizing = "border-box"
    target.style.height = `${target.offsetHeight}px`
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.style.overflow = "hidden"
    window.setTimeout(() => {
        target.style.display = "none"
        target.style.removeProperty("height")
        target.style.removeProperty("padding-top")
        target.style.removeProperty("padding-bottom")
        target.style.removeProperty("margin-top")
        target.style.removeProperty("margin-bottom")
        target.style.removeProperty("overflow")
        target.style.removeProperty("transition-duration")
        target.style.removeProperty("transition-property")
    }, duration)
}

export const slideDown = (target, duration) => {
    /* Sliding-down logic */
    target.style.removeProperty("display")
    let { display } = window.getComputedStyle(target)
    if (display === "none") {
        display = "block"
    }
    target.style.display = display
    const height = target.offsetHeight
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.style.overflow = "hidden"
    target.style.boxSizing = "border-box"
    target.style.transitionProperty = "height, margin, padding"
    target.style.transitionDuration = `${duration}ms`
    target.style.height = `${height}px`
    target.style.removeProperty("padding-top")
    target.style.removeProperty("padding-bottom")
    target.style.removeProperty("margin-top")
    target.style.removeProperty("margin-bottom")
    window.setTimeout(() => {
        target.style.removeProperty("height")
        target.style.removeProperty("overflow")
        target.style.removeProperty("transition-duration")
        target.style.removeProperty("transition-property")
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
