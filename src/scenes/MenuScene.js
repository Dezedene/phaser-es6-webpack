import Phaser from 'phaser'

let tst = false
let text = 'Toto'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  init (data) {
    console.log(data)
    console.log('I got it')
  }

  preload () {
    //
    // load your assets
    //
  }

  create () {

    this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height * 0.30, 'logo').setDepth(1)
    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    this.add.image(this.game.renderer.width / 2.1, this.game.renderer.height * 0.80, 'start_button').setDepth(1)

    this.add.text(0, 0, text)

    if (tst) {
      this.scene.start('GameScene')
    }
  }

  update () {}
}
