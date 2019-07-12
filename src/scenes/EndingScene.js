import Phaser from 'phaser'
import WebFont from 'webfontloader'

let loser
let music
let sound
let winner

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'EndingScene' })
  }

  init (data) {
    winner = data[0]
    sound = data[1]
  }

  preload () {
    music = this.sound.add('gameOver_music', { loop: true })

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
      music.play()
      const background = this.add.image(0, 0, 'Gif').setDepth(0)
      background.setOrigin(0, 0)

      var tconfig = {
        x: 210,
        y: 120,
        text: 'Game  Is  Over',
        style: {
          fontSize: '50px',
          fontFamily: 'Monoton',
          color: '#ffffff',
          align: 'center',
          lineSpacing: 44
        }
      }
      var text = this.make.text(tconfig)

      var winnertext = {
        x: 105,
        y: 220,
        text: `${winner}  Won  The  Game !`,
        style: {
          fontSize: '45px',
          fontFamily: 'Monoton',
          color: '#b7007a',
          align: 'center',
          lineSpacing: 44
        } }

      var tryGain = this.make.text(winnertext)

      var tryAgaintext = {
        x: 250,
        y: 450,
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
        music.stop()
      })
    }
  }

  update () {
    if (sound === false) {
      music.stop()
    }
    if (this.fontsReady) {
      this.scene.launch()
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
