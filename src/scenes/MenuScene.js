import Phaser from 'phaser'

let tst = false
let text = 'Toto'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  init () {
  }

  preload () {
    //
    // load your assets
    //
  }

  create () {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.30, 'logo').setDepth(1)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, 'start_button').setDepth(1)

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7 + 100, 'option_button').setDepth(1)

    let hoverSprite = this.add.sprite(120, 120, 'logo')
    hoverSprite.setScale(0.40)

    this.add.text(0, 0, text)

    playButton.setInteractive()

    playButton.on('pointerup', () => {
      this.scene.start('GameScene')
    })

    if (tst) {
      this.scene.start('GameScene')
    }
  }

  update () {}
}
