import CanvasBase from './CanvasBase'
import Bubble from './Components/Bubble'
import HairDryer from './Components/HairDryer'

export default class CanvasScene extends CanvasBase {
    constructor() {
        super()
        this.bubbles = []
        
        this.loop = this.loop.bind(this)
        this.loop()
        console.log(this.imgContext)
    }
    
    loop() {
        window.requestAnimationFrame(this.loop)

        this.drawBg()
        this.drawHairDryer()
        this.drawSoapMachine()
        this.drawBubbles()
    }
    
    drawBg() {
        this.context.clearRect(0, 0, this.state.screen.width, this.state.screen.height)
    }

    drawHairDryer() {
        const h = new HairDryer(this.imgContext, this.state.screen)
        if (this.state.keyPress) {
            h.draw(true)
        } else {
            h.draw(false)
        }
    }

    drawSoapMachine() {
        const i = new Image()
        i.addEventListener('load', () => {
            this.imgContext.drawImage(i, 500, (this.state.screen.height / 2) - 300, 500, 500)
        })
        i.src = 'static/soap_machine.png'
    }

    drawBubbles() {
        if (this.state.keyPress) {
            if (this.bubbles.length && this.bubbles[this.bubbles.length - 1].isGrowing) {
                this.bubbles[this.bubbles.length - 1].grow()
            } else {
                const bubble = new Bubble(
                    this.context,
                    this.state.screen
                )
                this.bubbles.push(bubble)
            }
        } else {
            if (this.bubbles.length) this.bubbles[this.bubbles.length - 1].isGrowing = false
        }

        for (const bubble of this.bubbles) {
            bubble.draw()
        }
        this.bubbles = this.bubbles.filter(__bubble => !__bubble.shouldDelete)
    }
}