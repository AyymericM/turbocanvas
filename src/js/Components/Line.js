export default class Line {
    constructor(_context, _bubble, _index) {
        this.bubble = _bubble
        this.context = _context
        this.index = _index

        this.line = {
            lineLength: 5,
            lineWidth: 2,
            x: null,
            y: null,
            endX: null,
            endY: null
        }
    }

    pop() {
        console.log('pop')
        this.updateLineValues()
        this.context.beginPath()
        this.context.strokeStyle = '#8bc9ee'
        this.context.lineWidth = 2
        this.context.moveTo(this.bubble.x, this.bubble.y)

        if(this.line.x < this.bubble.x) {
            this.line.endX = this.lineLength * -1
        }
        if(this.line.y < this.bubble.y) {
            this.line.endY = this.lineLength * -1
        }
        if(this.line.y === this.bubble.y) {
            this.line.endY = 0
        }
        if(this.line.x === this.bubble.x) {
            this.line.endX = 0
        }

        this.context.lineTo(this.line.x + this.line.endX, this.line.y + this.line.endY)
        this.context.stroke()
        if (this.line.timeBeforeDie <= 0) {
            this.shouldDelete = true
        } else {
            this.line.timeBeforeDie -= 1
        }
    }

    updateLineValues() {
        this.line.x = this.bubble.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / 8);
        this.line.y = this.bubble.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / 8);
        this.lineLength = this.bubble.radius * this.popDistance;
        this.endX = this.lineLength;
        this.endY = this.lineLength;
    }
}