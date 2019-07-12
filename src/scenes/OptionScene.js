import Phaser from 'phaser'

let sound = true
let pickPlayerText
let ballChoosen
let playersChoosen = []

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
    this.load.image('lapin', 'asserts/characters/Lapin.png')
    this.load.image('mario', 'asserts/characters/Mario.png')
    this.load.image('flower', 'asserts/characters/Flower.png')
  }

  create () {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.25, 'title').setDepth(1).setScale(1.7)

    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    var loadingConf = {
      x: 280,
      y: 390,
      text: 'Player 1 pick a player to play with',
      style: {
        fontSize: '25px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    pickPlayerText = this.make.text(loadingConf)

    var ballConf = {
      x: 280,
      y: 480,
      text: 'Pick a ball to play with',
      style: {
        fontSize: '25px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    var balls = this.make.text(ballConf)

    let ball = this.add.image(200, 550, 'ball')
    let boule = this.add.image(400, 550, 'boule')
    let beach = this.add.image(600, 550, 'beach')

    let soundOnButton = this.add.image(350, 350, 'soundOnButton').setDepth(1)

    let soundOffButton = this.add.image(450, 350, 'soundOffButton').setDepth(1)

    let lapin = this.add.image(200, 450, 'lapin')
    let mario = this.add.image(400, 450, 'mario')
    let flower = this.add.image(600, 450, 'flower')

    soundOnButton.setInteractive()
    soundOffButton.setInteractive()

    ball.setInteractive()
    boule.setInteractive()
    beach.setInteractive()

    lapin.setInteractive()
    mario.setInteractive()
    flower.setInteractive()

    soundOnButton.on('pointerup', () => {
      sound = true
    })

    soundOffButton.on('pointerup', () => {
      sound = false
    })

    lapin.on('pointerup', () => {
      if (playersChoosen.length < 2) {
        playersChoosen = [...playersChoosen, 'lapin']
      }
    })

    mario.on('pointerup', () => {
      if (playersChoosen.length < 2) {
        playersChoosen = [...playersChoosen, 'mario']
      }
    })

    flower.on('pointerup', () => {
      if (playersChoosen.length < 2) {
        playersChoosen = [...playersChoosen, 'flower']
      }
      console.log(playersChoosen)
    })

    ball.on('pointerup', () => {
      ballChoosen = 'ball'
      if (playersChoosen.length === 2) {
        this.scene.start('GameScene', [ballChoosen, sound, playersChoosen])
      }
    })

    boule.on('pointerup', () => {
      ballChoosen = 'boule'
      if (playersChoosen.length === 2) {
        this.scene.start('GameScene', [ballChoosen, sound, playersChoosen])
      }
    })

    beach.on('pointerup', () => {
      ballChoosen = 'beach'
      if (playersChoosen.length === 2) {
        this.scene.start('GameScene', [ballChoosen, sound, playersChoosen])
      }
    })
  }

  update () {
    if (playersChoosen.length === 1) {
      pickPlayerText.setText('Player 2 pick a player to play with')
    }
    if (playersChoosen.length === 2) {
      pickPlayerText.setText(`Player 1 has choose ${playersChoosen[0]} & Player 2 has choose ${playersChoosen[1]}`)
    }
  }
}
