import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'LoadScene' })
  }

  init () {

  }

  preload () {
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.add.text(100, 100, 'loading fonts...')

    WebFont.load({
      google: {
        families: ['Bangers', 'Monoton']
      },
      active: this.fontsLoaded
    })

    this.load.image('title_bg', 'asserts/backgrounds/volcano-game-background-5.jpg')

    this.load.image('start_button', 'asserts/various/start.png')

    this.load.image('option_button', 'asserts/various/option.png')

    this.load.image('logo', 'asserts/various/logo.png')

    this.load.spritesheet('volleyBall', 'asserts/balls/volleyball.png', {
      frameHeight: 32,
      frameWidth: 32
    })

    this.load.audio('title_music', 'asserts/musics/AlexBeroza_-_Kalte_Ohren.mp3')

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xE29224
      }
    })

    this.load.on('progress', (percent) => {
      console.log(percent)
    })
  }

  create () {

  }

  update () {
    if (this.fontsReady) {
      this.scene.start('MenuScene', 'hello from LoadScene')
      this.scene.launch()
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
