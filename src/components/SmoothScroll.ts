function easeInOutCubic(t: number) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

function smoothScroll(offset: number) {
    const duration = 500
    const clock = Date.now()

    const end = offset

    // we use requestAnimationFrame to be called by the browser before every repaint
    const requestAnimationFrame = 
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        ((fn) => window.setTimeout(fn, 15))
    
    const step = () => {
        // the time elapsed from the beginning of the scroll
        const elapsed = Date.now() - clock
        // calculate the scroll position we should be in
        let position = end

        if (elapsed < duration) {
            position = window.pageYOffset + (end - window.pageYOffset) * easeInOutCubic(elapsed / duration)
            requestAnimationFrame(step)

            window.scroll(0, position)
        }
    }

    step()
}

export default smoothScroll