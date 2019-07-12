import Phaser from 'phaser'

let music

let options

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  init (data) {
    options = data
  }

  preload () {
    //
    // load your assets
    //
    music = this.sound.add('title_music')
  }

  create () {
    console.log(Object.keys(options).length)
    if (Object.keys(options).length === 0) {
      music.play()
    }

    if (Object.keys(options).length === 2) {
      if (options[1] === false) {
        music.stop()
      }
    }
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setDepth(1).setScale(1.7)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65, 'start_button').setDepth(1)

    let optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.65 + 100, 'option_button').setDepth(1)

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

  update () {
  }
}
