import Sounds from "./Sounds";

export default class Bubble {
    constructor(_context, _screen) {
        this.context = _context
        this.angle = (Math.random() * (Math.PI / 2)) + (Math.PI * 1.7)
        this.isVisible = true
        this.shouldDelete = false
        this.isGrowing = true
        this.screen = _screen
        this.timeBeforeDie = 160
        this.hasPlayedRelease = false
        this.hasPlayedPop = false

        this.conf = {
            x: 930,
            y: (this.screen.height / 2) + 110,
            radius: Math.random() * 10 + 30,
            color: `hsl(0, 100%, 100%)`,
            alpha: Math.random() * 0.5 + 0.5,
            speed: {
                x: Math.cos(this.angle),
                y: Math.sin(this.angle),
                offset: Math.pow(Math.random(), 3)
            }
        }
    }

    grow() {
        this.conf.radius += 0.2
    }

    draw() {
        if (!this.isGrowing && this.isVisible) {
            this.conf.x += this.conf.speed.x
            this.conf.y += this.conf.speed.y
            this.conf.y += this.conf.speed.offset
        }

        if (!this.isGrowing && !this.hasPlayedRelease) {
            const sounds = new Sounds()
            sounds.bubbleRelease()
            this.hasPlayedRelease = true
        }

        if (
            this.conf.x - this.conf.radius <= this.conf.radius ||
            this.conf.x + this.conf.radius>= this.screen.width ||
            this.conf.y + this.conf.radius <= this.conf.radius ||
            this.conf.y - this.conf.radius >= this.screen.height
        ) {
            this.isVisible = false
            if (!this.isVisible && !this.hasPlayedPop) {
                const sounds = new Sounds()
                sounds.pop()
                this.hasPlayedPop = true
            }
        }

        if (this.isVisible) {
            this.context.save()
            this.context.beginPath()
            this.context.globalAlpha = this.conf.alpha
            this.context.fillStyle = this.conf.color
            this.context.arc(this.conf.x, this.conf.y, this.conf.radius, 0, Math.PI * 2)
            this.context.fill()
            this.context.closePath()
            this.context.restore()
        } else {
            if (this.timeBeforeDie <= 0) {
                this.shouldDelete = true
            } else {
                this.timeBeforeDie -= 1
            }
        }
    }
}