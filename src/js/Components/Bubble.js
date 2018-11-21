export default class Bubble {
    constructor(_context, _screen) {
        this.context = _context
        this.angle = Math.random() * Math.PI * 2
        this.isVisible = true,
        this.isGrowing = true
        this.screen = _screen
        this.conf = {
            x: 930,
            y: 560,
            radius: Math.random() * 10 + 30,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: {
                x: Math.cos(this.angle),
                y: Math.sin(this.angle)
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
        }

        if (
            this.conf.x < - this.conf.radius ||
            this.conf.x > this.screen.width + this.conf.radius ||
            this.conf.y < - this.conf.radius ||
            this.conf.y > this.screen.height + this.conf.radius
        ) {
            this.isVisible = false
        }

        this.context.save()
        this.context.beginPath()
        this.context.arc(this.conf.x, this.conf.y, this.conf.radius, 0, Math.PI * 2)
        this.context.fillStyle = this.conf.color
        this.context.fill()
        this.context.restore()
    }
}