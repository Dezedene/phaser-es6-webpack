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
  }

  create () {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setDepth(1).setScale(1.7)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    const instructionsConf = {
      x: this.game.renderer.width / 3.50,
      y: this.game.renderer.height * 0.61,
      text: 'Sound:',
      style: {
        fontSize: '40px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      }
    }

    this.make.text(instructionsConf)

    let soundOffButton = this.add.image(this.game.renderer.width / 2.20, this.game.renderer.height * 0.65, 'soundOffButton').setDepth(1)

    let soundOnButton = this.add.image(this.game.renderer.width / 1.85, this.game.renderer.height * 0.65, 'soundOnButton').setDepth(1)

    soundOnButton.setInteractive()

    soundOffButton.setInteractive()

    soundOnButton.on('pointerup', () => {
      sound = true
    })

    soundOffButton.on('pointerup', () => {
      sound = false
    })
  }

  update () {

  }
}
