export default class HairDryer {
    constructor(_context, _screen) {
        this.context = _context
        this.screen = _screen
    }

    draw() {
        const i = new Image()
        i.addEventListener('load', () => {
            this.context.drawImage(i, 100, (this.screen.height / 2) - 300, 500, 500)
        })
        i.src = 'static/hair_dryer.png'
    }

    shake() {

    }
}