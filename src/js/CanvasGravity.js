import CanvasBase from './CanvasBase'

export default class CanvasGravity extends CanvasBase {
    constructor(params) {
        super(params)
        this.ball = {
            x: 100,
            y: 100,
            radius: 50,
            speed: {
                x: 0,
                y: 0
            },
            gravity: 0.5,
            airFriction: 0.99
        }

        this.canvas.addEventListener('click', (e) => this.handleClick(e))
        this.loop = this.loop.bind(this)
        this.loop()
    }

    loop() {
        window.requestAnimationFrame(this.loop)

        this.ball.speed.x *= this.ball.airFriction
        this.ball.speed.y *= this.ball.airFriction

        this.ball.speed.y += this.ball.gravity

        this.ball.x += this.ball.speed.x
        this.ball.y += this.ball.speed.y

        if(this.ball.y > this.state.screen.height - this.ball.radius) {
            this.ball.speed.y *= - 1
            this.ball.y = this.state.screen.height - this.ball.radius
        }
        if(this.ball.x > this.state.screen.width - this.ball.radius) {
            this.ball.speed.x *= - 1
            this.ball.x = this.state.screen.width - this.ball.radius
        }
        if(this.ball.x < this.ball.radius) {
            this.ball.speed.x *= - 1
            this.ball.x = this.ball.radius
        }

        // Clear
        this.context.clearRect(0, 0, this.state.screen.width, this.state.screen.height)
        
        // Draw
        this.context.beginPath()
        this.context.fillStyle = 'orange'
        this.context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2)
        this.context.fill()
    }

    handleClick(e) {
        const distance = Math.hypot(
            this.ball.x - e.clientX, 2,
            this.ball.y - e.clientY, 2
        )

        if (distance < this.ball.radius) {
            this.ball.speed.x = (Math.random() * 60) * (Math.random() - 0.5)
            this.ball.speed.y = - Math.random() * 30
        }
    }
}