import Phaser from 'phaser'
import WebFont from 'webfontloader'

let loser

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'EndingScene' })
  }

  init (data) {
    loser = data
  }

  preload () {
    this.load.image('Gif', 'asserts/various/BackgroundEnd.jpg.jpg')
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)

    WebFont.load({
      google: {
        families: ['Orbitron', 'Monoton']
      },
      active: this.fontsLoaded
    })
  }

  create () {
    this.fontsLoaded()
    if (this.fontsReady) {
      const background = this.add.image(0, 0, 'Gif').setDepth(0)
      background.setOrigin(0, 0)

      var tconfig = {
        x: 280,
        y: 200,
        text: 'Game Over !',
        style: {
          fontSize: '34px',
          fontFamily: 'Monoton',
          color: '#ffffff',
          align: 'center',
          lineSpacing: 44
        }
      }
      var text = this.make.text(tconfig)

      var losertext = {
        x: 265,
        y: 300,
        text: loser,
        style: {
          fontSize: '54px',
          fontFamily: 'Monoton',
          color: '#b7007a',
          align: 'center',
          lineSpacing: 44
        } }

      var tryGain = this.make.text(losertext)

      var tryAgaintext = {
        x: 250,
        y: 500,
        text: 'Try again',
        style: {
          fontSize: '54px',
          fontFamily: 'Monoton',
          color: '#ff0000',
          align: 'center',
          lineSpacing: 44
        } }

      var tryGain = this.make.text(tryAgaintext)

      tryGain.setInteractive()

      tryGain.on('pointerup', () => {
        this.scene.start('LoadScene')
      })
    }
  }

  update () {
    if (this.fontsReady) {
      this.scene.launch()
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
