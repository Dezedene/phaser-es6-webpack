import Phaser from 'phaser'

let music

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
    music = this.sound.add('title_music')
  }

  create () {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setDepth(1).setScale(1.7)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65, 'start_button').setDepth(1)

    let optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65 + 100, 'option_button').setDepth(1)

    music.play()

    let hoverSprite = this.add.sprite(120, 120, 'logo')
    hoverSprite.setScale(0.30)
    hoverSprite.setVisible(false)

    playButton.setInteractive()

    playButton.on('pointerover', () => {
      hoverSprite.setVisible(true)
      hoverSprite.x = playButton.x - playButton.width
      hoverSprite.y = playButton.y
    })

    optionButton.setInteractive()

    optionButton.on('pointerover', () => {
      hoverSprite.setVisible(true)
      hoverSprite.x = optionButton.x - optionButton.width
      hoverSprite.y = optionButton.y
    })

    playButton.on('pointerout', () => {
      hoverSprite.setVisible(false)
    })

    playButton.on('pointerup', () => {
      this.scene.start('GameScene')
      music.stop()
    })

    optionButton.on('pointerup', () => {
      this.scene.start('OptionScene')
    })
  }

  update () {}
}
