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
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })
  }

  create () {
  }

  update () {
    if (this.fontsReady) {
      this.scene.start('MenuScene', 'hello from BootScene')
      this.scene.launch()
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
