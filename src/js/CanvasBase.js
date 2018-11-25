import Sounds from "./Components/Sounds";

export default class CanvasBase {
    constructor() {
        this.canvas = document.querySelector('.js-canvas')
        this.context = this.canvas.getContext('2d')
        
        this.imgCanvas = document.querySelector('.js-img-canvas')
        this.imgContext = this.imgCanvas.getContext('2d')

        this.sounds = new Sounds()

        this.state = {
            screen: {
                width: this.canvas.width,
                height: this.canvas.height,
            },
            cursor: {
                x: 0,
                y: 0,
                down: false
            },
            keyPress: false
        }

        window.addEventListener('resize', () => this.resize())
        window.addEventListener('mousemove', e => this.updateCursor(e))
        window.addEventListener('mousedown', () => this.state.cursor.down = true)
        window.addEventListener('mouseup', () => this.state.cursor.down = false)
        window.addEventListener('keydown', e => this.updateKeyPress(e, true))
        window.addEventListener('keyup', e => this.updateKeyPress(e, false))
        this.resize()
    }

    resize() {
        this.state.screen.width = window.innerWidth
        this.state.screen.height = window.innerHeight
        
        this.canvas.width = this.state.screen.width
        this.canvas.height = this.state.screen.height
        
        this.imgCanvas.width = this.state.screen.width
        this.imgCanvas.height = this.state.screen.height
    }

    updateCursor(e) {
        this.state.cursor = {
            x: e.clientX,
            y: e.clientY,
            down: e
        }
    }

    updateKeyPress(e, _bool) {
        if (e.keyCode === 32) {
            this.state.keyPress = _bool
            if (this.state.keyPress) {
                this.sounds.ambiant(true)
            } else {
                this.sounds.ambiant(false)
            }
        }
    }

    getRandomColor() {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }
}