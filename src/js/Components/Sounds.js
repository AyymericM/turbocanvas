export default class Sounds {
    constructor() {
        this.sounds = {
            bubble_release: new Audio('static/sounds/bubble_release.mp3'),
            hair_dryer: new Audio('static/sounds/hair_dryer.mp3'),
            pump: new Audio('static/sounds/pump.mp3'),
            pops: [
                new Audio('static/sounds/pop_1.mp3'),
                new Audio('static/sounds/pop_2.mp3'),
                new Audio('static/sounds/pop_3.mp3')
            ]
        }
    }

    pop() {
        this.sounds.pops[Math.floor(Math.random() * 2)].play()
    }

    bubbleRelease() {
        this.sounds.bubble_release.play()
    }
    
    ambiant(_bool) {
        console.log(this.sounds)
        // this.sounds.hair_dryer.volume = 0.3
        if (_bool) {
            this.sounds.hair_dryer.play()
        } else {
            this.sounds.hair_dryer.pause()
        }
        //this.sounds.pump.play()        
    }
}