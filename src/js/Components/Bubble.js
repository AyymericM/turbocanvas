import Line from "./Line";

export default class Bubble {
    constructor(_context, _screen) {
        this.context = _context
        this.angle = (Math.random() * (Math.PI / 2)) + (Math.PI * 1.7)
        this.isVisible = true
        this.shouldDelete = false
        this.isGrowing = true
        this.screen = _screen
        this.timeBeforeDie = 90

        this.lines = []

        this.conf = {
            x: 930,
            y: 560,
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
        if (!this.isGrowing) {
            this.conf.x += this.conf.speed.x
            this.conf.y += this.conf.speed.y

            // this.conf.x *= this.conf.speed.offset
            this.conf.y += this.conf.speed.offset
        }

        if (
            this.conf.x < - this.conf.radius ||
            this.conf.x > this.screen.width + this.conf.radius ||
            this.conf.y < - this.conf.radius ||
            this.conf.y > this.screen.height + this.conf.radius
        ) {
            this.isVisible = false
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
            for (let i = 0; i < 8 - this.lines.length; i++) {
                const line = new Line(this.context, this.conf, i)
                this.lines.push(line)
            }
            for (const line of this.lines) {
                line.pop()
            }
            this.timeBeforeDie -= 1
        }
    }
}