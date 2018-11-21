import CanvasBase from './CanvasBase'
import Bubble from './Components/Bubble'
import HairDryer from './Components/HairDryer'

export default class CanvasScene extends CanvasBase {
    constructor() {
        super()
        this.bubbles = []
        
        this.loop = this.loop.bind(this)
        this.loop()
    }
    
    loop() {
        window.requestAnimationFrame(this.loop)

        this.drawHairDryer()
        this.drawSoapMachine()
        // this.drawBubbles()
    }

    drawHairDryer() {
        const h = new HairDryer(this.context, this.state.screen)
        h.draw()
        if (this.state.keyPress) {
            h.shake()
        }
    }

    drawSoapMachine() {
        const i = new Image()
        i.addEventListener('load', () => {
            this.context.drawImage(i, 550, (this.state.screen.height / 2) - 300, 400, 400)
        })
        i.src = 'static/soap_machine.png'
    }

    drawBubbles() {
        if (this.state.keyPress) {
            const bubble = new Bubble(
                this.state.cursor.x,
                this.state.cursor.y,
                this.context,
                this.state.screen
            )
            this.bubbles.push(bubble)
        }
        for (const bubble of this.bubbles) {
            bubble.draw()
        }
        this.bubbles = this.bubbles.filter(__particle => __particle.isVisible)
    }
}