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
    this.add.text(100, 100, 'loading Game...')

    WebFont.load({
      google: {
        families: ['Bangers', 'Monoton']
      },
      active: this.fontsLoaded
    })

    this.load.image('title_bg', 'asserts/backgrounds/volcano-game-background-5.jpg')

    this.load.image('title', 'asserts/various/headhunter.png')

    this.load.image('start_button', 'asserts/various/start.png')

    this.load.image('option_button', 'asserts/various/option.png')

    this.load.image('logo', 'asserts/various/nyanlogo.png')

    this.load.spritesheet('volleyBall', 'asserts/balls/volleyball.png', {
      frameHeight: 32,
      frameWidth: 32
    })

    this.load.audio('title_music', 'asserts/musics/Boss Fight.ogg')

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x44E224
      }
    })

    for (let i = 0; i < 100; i++) {
      this.load.spritesheet('logo' + i, 'asserts/various/nyanlogo.png', {
        frameHeight: 32,
        frameWidth: 32
      })
    }

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
      console.log(percent)
    })
  }

  create () {

  }

  update () {
    if (this.fontsReady) {
      this.scene.start('MenuScene')
      this.scene.launch()
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
