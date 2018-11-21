export default class HairDryer {
    constructor(_context, _screen) {
        this.context = _context
        this.screen = _screen
        this.state = {
            posX: 0,
            posY: (this.screen.height / 2) - 200,
            scaleX: 500,
            scaleY: 500
        }
    }

    draw(shake) {
        const i = new Image()
        i.addEventListener('load', () => {
            if (shake) {
                this.context.drawImage(
                    i,
                    this.state.posX + Math.floor(Math.random() * 10),
                    this.state.posY + Math.floor(Math.random() * 10),
                    this.state.scaleX,
                    this.state.scaleY
                )
            } else {
                this.context.drawImage(
                    i,
                    this.state.posX,
                    this.state.posY,
                    this.state.scaleX,
                    this.state.scaleY
                )
            }
        })
        i.src = 'static/hair_dryer.png'
    }
}