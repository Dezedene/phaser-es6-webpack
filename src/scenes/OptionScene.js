import Phaser from 'phaser'

let sound = true
let ballChoosen

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'OptionScene' })
  }

  init () {
  }

  preload () {
    this.load.image('soundOnButton', 'asserts/buttons/soundOn.png')
    this.load.image('soundOffButton', 'asserts/buttons/soundOff.png')
    this.load.image('ball', 'asserts/balls/BallTest.png')
    this.load.image('boule', 'asserts/balls/FootBall.png')
    this.load.image('beach', 'asserts/balls/BeachBall.png')
  }

  create () {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setDepth(1).setScale(1.7)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    var loadingConf = {
      x: 280,
      y: 420,
      text: 'Pick a ball to play with',
      style: {
        fontSize: '25px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    var tryGain = this.make.text(loadingConf)

    let ball = this.add.image(200, 500, 'ball')
    let boule = this.add.image(400, 500, 'boule')
    let beach = this.add.image(600, 500, 'beach')

    let soundOnButton = this.add.image(this.game.renderer.width / 1.85, this.game.renderer.height * 0.65, 'soundOnButton').setDepth(1)

    let soundOffButton = this.add.image(this.game.renderer.width / 2.20, this.game.renderer.height * 0.65, 'soundOffButton').setDepth(1)

    soundOnButton.setInteractive()

    soundOffButton.setInteractive()

    ball.setInteractive()
    boule.setInteractive()
    beach.setInteractive()

    soundOnButton.on('pointerup', () => {
      sound = true
    })

    soundOffButton.on('pointerup', () => {
      sound = false
    })

    ball.on('pointerup', () => {
      ballChoosen = 'ball'
    })

    boule.on('pointerup', () => {
      ballChoosen = 'boule'
    })

    beach.on('pointerup', () => {
      ballChoosen = 'beach'
      this.scene.start('MenuScene', [ballChoosen, sound])
    })
  }

  update () {

  }
}
