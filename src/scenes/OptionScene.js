import Phaser from 'phaser'

let sound = true

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'OptionScene' })
  }

  init () {
  }

  preload () {
    this.load.image('soundOnButton', 'asserts/buttons/soundOn.png')
    this.load.image('soundOffButton', 'asserts/buttons/soundOff.png')
    this.load.image('backButton', 'asserts/buttons/backButton.png')
  }

  create () {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setDepth(1).setScale(1.7)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    const soundInstruction = {
      x: this.game.renderer.width / 3.50,
      y: this.game.renderer.height * 0.61,
      text: 'Sound:',
      style: {
        fontSize: '35px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      }
    }

    this.make.text(soundInstruction)

    const backInstruction = {
      x: this.game.renderer.width / 3.50,
      y: this.game.renderer.height * 0.86,
      text: 'Main menu:',
      style: {
        fontSize: '35px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      }
    }

    this.make.text(backInstruction)

    let soundOffButton = this.add.image(this.game.renderer.width / 2.20, this.game.renderer.height * 0.65, 'soundOffButton').setDepth(1)

    let soundOnButton = this.add.image(this.game.renderer.width / 1.85, this.game.renderer.height * 0.65, 'soundOnButton').setDepth(1)

    let backButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.9, 'backButton').setDepth(1)

    soundOnButton.setInteractive()

    soundOffButton.setInteractive()

    backButton.setInteractive()

    soundOnButton.on('pointerup', () => {
      sound = true
    })

    soundOffButton.on('pointerup', () => {
      sound = false
    })

    backButton.on('pointerup', () => {
      this.scene.start('MenuScene')
    })
  }

  update () {

  }
}
