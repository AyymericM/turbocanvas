import CanvasBase from './CanvasBase'

export default class CanvasLoop extends CanvasBase {
    constructor(params) {
        super(params)
        this.arc = {
            loopX: 0,
            arcRadius: (Math.random() * 100) + 15,
            arcSpeed: (Math.random() * 10) + 5,
            arcColor: this.getRandomColor()
        }

        this.loop = this.loop.bind(this)
        this.loop()
    }

    loop() {
        window.requestAnimationFrame(this.loop)

        this.context.clearRect(0, 0, this.state.screen.width, this.state.screen.height)
    
        this.context.beginPath()
        this.context.fillStyle = this.arc.arcColor
        this.context.arc(this.arc.loopX, 300, this.arc.arcRadius, 0, Math.PI * 2)
        this.context.fill()

        if (this.arc.loopX < this.state.screen.width - this.arc.arcRadius) {
            this.arc.loopX += this.arc.arcSpeed
        } else {
            this.arc.arcRadius = (Math.random() * 100) + 15
            this.arc.arcSpeed = (Math.random() * 10) + 5
            this.arc.arcColor = this.getRandomColor()
            this.arc.loopX = 0
        }
    }
}