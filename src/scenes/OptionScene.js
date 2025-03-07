import Phaser from 'phaser'

let sound = true
let pickPlayerText
let pickPlayer2Text
let ballChoosen
let playersChoosen = []
let balls

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
    this.load.image('ball', 'asserts/balls/BallTest.png')
    this.load.image('boule', 'asserts/balls/FootBall.png')
    this.load.image('beach', 'asserts/balls/BeachBall.png')
    this.load.image('lapin', 'asserts/characters/Lapin.png')
    this.load.image('mario', 'asserts/characters/Mario.png')
    this.load.image('flower', 'asserts/characters/Flower.png')
  }

  create () {
    this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)

    const soundInstruction = {
      x: 260,
      y: 70,
      text: 'Sound:',
      style: {
        fontSize: '35px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    var loadingConf = {
      x: 260,
      y: 140,
      text: 'Player 1 pick a player to play with',
      style: {
        fontSize: '25px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    pickPlayerText = this.make.text(loadingConf)

    var loadingConf2 = {
      x: 260,
      y: 250,
      text: 'Player 2 pick a player to play with',
      style: {
        fontSize: '25px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    pickPlayer2Text = this.make.text(loadingConf2)

    var ballConf = {
      x: 310,
      y: 360,
      text: 'Pick a ball to play with',
      style: {
        fontSize: '25px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      } }

    balls = this.make.text(ballConf)

    let ball = this.add.image(200, 430, 'ball')
    let boule = this.add.image(400, 430, 'boule')
    let beach = this.add.image(600, 430, 'beach')

    this.make.text(soundInstruction)

    const backInstruction = {
      x: 230,
      y: 510,
      text: 'Start the game :',
      style: {
        fontSize: '35px',
        fontFamily: 'Bangers',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 44
      }
    }

    this.make.text(backInstruction)

    let soundOnButton = this.add.image(400, 85, 'soundOnButton').setDepth(1)

    let soundOffButton = this.add.image(500, 85, 'soundOffButton').setDepth(1)

    let backButton = this.add.image(520, 530, 'backButton').setDepth(1)

    let lapin = this.add.image(200, 205, 'lapin')
    let mario = this.add.image(400, 205, 'mario')
    let flower = this.add.image(600, 205, 'flower')

    let lapinP2 = this.add.image(200, 315, 'lapin')
    let marioP2 = this.add.image(400, 315, 'mario')
    let flowerP2 = this.add.image(600, 315, 'flower')

    soundOnButton.setInteractive()
    soundOffButton.setInteractive()

    backButton.setInteractive()
    ball.setInteractive()
    boule.setInteractive()
    beach.setInteractive()

    lapin.setInteractive()
    mario.setInteractive()
    flower.setInteractive()

    lapinP2.setInteractive()
    marioP2.setInteractive()
    flowerP2.setInteractive()

    soundOnButton.on('pointerup', () => {
      sound = true
    })

    soundOffButton.on('pointerup', () => {
      sound = false
    })

    backButton.on('pointerup', () => {
      if (playersChoosen.length === 2) {
        this.scene.start('GameScene', [ballChoosen, sound, playersChoosen])
      }
    })
    lapin.on('pointerup', () => {
      if (playersChoosen.length < 1) {
        playersChoosen = [...playersChoosen, 'lapin']
      }
    })

    mario.on('pointerup', () => {
      if (playersChoosen.length < 1) {
        playersChoosen = [...playersChoosen, 'mario']
      }
    })

    flower.on('pointerup', () => {
      if (playersChoosen.length < 1) {
        playersChoosen = [...playersChoosen, 'flower']
      }
    })

    lapinP2.on('pointerup', () => {
      if (playersChoosen.length < 2) {
        playersChoosen = [...playersChoosen, 'lapin']
      }
    })

    marioP2.on('pointerup', () => {
      if (playersChoosen.length < 2) {
        playersChoosen = [...playersChoosen, 'mario']
      }
    })

    flowerP2.on('pointerup', () => {
      if (playersChoosen.length < 2) {
        playersChoosen = [...playersChoosen, 'flower']
      }
    })

    ball.on('pointerup', () => {
      ballChoosen = 'ball'
    })

    boule.on('pointerup', () => {
      ballChoosen = 'boule'
    })

    beach.on('pointerup', () => {
      ballChoosen = 'beach'
    })
  }

  update () {
    if (playersChoosen.length === 1) {
      pickPlayerText.setText(`Player one picked ${playersChoosen[0]}`)
    }
    if (playersChoosen.length === 2) {
      pickPlayer2Text.setText(`Player two picked ${playersChoosen[1]}`)
    }
    if (ballChoosen !== undefined) {
      balls.setText(`You picked the ${ballChoosen}`)
    }
  }
}
