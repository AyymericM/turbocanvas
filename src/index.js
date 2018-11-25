import 'normalize.css'
import './sass/main.sass'
import CanvasScene from './js/CanvasScene'

const sentences = [
    'In a world where we do things with the "moyens du bord"...',
    '...In a world where we do sounds effects with the mouth...',
    '...In a world where we press *spacebar* to make bubbles...',
    '...This is my creation.',
]

let sIndex = 0

const $canvas = document.querySelector('.js-canvas')
const $imgCanvas = document.querySelector('.js-img-canvas')
const $intro = document.querySelector('.intro')
const $introContent = $intro.querySelector('.intro-content')

function circleTexts() {
    if (sIndex < sentences.length) {
        $introContent.innerText = sentences[sIndex]
        $introContent.style.opacity = 1
        setTimeout(() => {
            $introContent.style.opacity = 0
        }, 2500)
        sIndex += 1
    } else {
        $intro.style.opacity = 0
        $imgCanvas.style.display = 'block'
        $canvas.style.display = 'block'
        new CanvasScene()
        setTimeout(() => {
            $imgCanvas.style.opacity = 1
            $canvas.style.opacity = 1
            setTimeout(() => {
                $intro.style.display = 'none'
                clearInterval(interval)
            }, 1500)
        }, 200)
    }
}

const interval = setInterval(() => circleTexts(), 4500)
circleTexts()

// new CanvasScene()