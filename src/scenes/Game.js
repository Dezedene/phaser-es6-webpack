/* globals __DEV__ */
import Phaser from 'phaser'

let ground
let leftSide
let rightSide
let logo
let logoAccelerationX = 100
let logoAccelerationY = 100
let ball = 'beach'
let player
let player2
let scorePlayer = 0
let scoreText
let scorePlayer2Text
let scorePlayer2 = 0
let cursors
let keyQ
let keyZ
let keyD
let Seb
let loser
let time = 60
let ballTime = 3
let timer
let timedEvent
let halfTime
let pictureAppear
let winner
let music
let ballChoosen
let sound

let heads = []

let defaultPlayer1 = 'mario'
let defaultPlayer2 = 'flower'
let player1Character
let player2Character

let dynamic

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init (data) {
    if (Object.keys(data).length) {
      ballChoosen = data[0]
      sound = data[1]
      player1Character = data[2][0]
      player2Character = data[2][1]
    }
  }

  preload () {
    music = this.sound.add('game_music')
    time = 25
    scorePlayer = 0
    scorePlayer2 = 0

    this.load.image('background', 'asserts/backgrounds/volcano-game-background-5.jpg')
    this.load.image('ground', 'asserts/various/Right-sideTransparent.png')
    this.load.image('ball', 'asserts/balls/BallTest.png')
    this.load.image('boule', 'asserts/balls/FootBall.png')
    this.load.image('beach', 'asserts/balls/BeachBall.png')
    this.load.image('filet', 'asserts/various/Rectangle2.png')
    this.load.spritesheet('lapin', 'asserts/characters/Lapin.png', { frameWidth: 40, frameHeight: 40 })
    this.load.spritesheet('mario', 'asserts/characters/Mario.png', { frameWidth: 40, frameHeight: 40 })
    this.load.spritesheet('flower', 'asserts/characters/Flower.png', { frameWidth: 40, frameHeight: 40 })

    this.load.image('Seb', 'asserts/characters/Seb.png')
    this.load.image('Matthieu', 'asserts/characters/Matthieu.png')
    this.load.image('Etienne', 'asserts/characters/Etienne.png')
    this.load.image('ClémentB', 'asserts/characters/ClémentB.png')
    this.load.image('Thomas', 'asserts/characters/Thomas.png')
    heads.push('Seb', 'Matthieu', 'Etienne', 'ClémentB', 'Thomas')
  }

  create () {
    var show = heads[Math.floor(Math.random() * heads.length)]
    music.play()

    this.add.image(200, 280, 'background')
    dynamic = this.physics.add.group()
    Seb = dynamic.create(400, -100, show)
    Seb.body.setAllowGravity(false)

    ground = this.physics.add.staticGroup()
    leftSide = ground.create(175, 850, 'ground')
    rightSide = ground.create(625, 850, 'ground')

    const filet = this.physics.add.staticGroup()
    filet.create(400, 800, 'filet')

    player = this.physics.add.sprite(100, 350, player1Character || defaultPlayer1)
    player2 = this.physics.add.sprite(700, 350, player2Character || defaultPlayer2)

    player.body.setGravityY(60)
    player2.body.setGravity(60)

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    player2.setCollideWorldBounds(true)

    const particles = this.add.particles(ballChoosen || ball)
    const emitter = particles.createEmitter({
      speed: { start: 10, end: 90 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    logo = this.physics.add.image(150, 100, ballChoosen || ball)

    logo.body.setCircle(20)
    logo.setVelocity(logoAccelerationX, logoAccelerationY)
    logo.setBounce(1.2, 1.2)
    logo.setCollideWorldBounds(true)
    this.physics.add.collider(logo, ground)
    this.physics.add.collider(logo, player)
    this.physics.add.collider(logo, player2)

    emitter.startFollow(logo)

    cursors = this.input.keyboard.createCursorKeys()
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.physics.add.collider(player, ground)
    this.physics.add.collider(player2, ground)

    this.physics.add.collider(filet, player2)
    this.physics.add.collider(filet, player)
    this.physics.add.collider(filet, ball)
    this.physics.add.collider(logo, filet)

    this.physics.add.collider(logo, Seb)
    this.physics.add.collider(Seb, filet)

    var scoreTextConf = {
      x: 50,
      y: 50,
      text: scorePlayer,
      style: {
        fontSize: '40px',
        fontFamily: 'Bangers',
        color: '#6aff00',
        align: 'center',
        lineSpacing: 44
      } }
    scoreText = this.make.text(scoreTextConf)

    var scorePlayer2Conf = {
      x: 620,
      y: 50,
      text: scorePlayer2,
      style: {
        fontSize: '40px',
        fontFamily: 'Bangers',
        color: '#6aff00',
        align: 'center',
        lineSpacing: 44
      } }
    scorePlayer2Text = this.make.text(scorePlayer2Conf)

    var timerConf = {
      x: 400,
      y: 50,
      text: time,
      style: {
        fontSize: '30px',
        fontFamily: 'Bangers',
        color: '#f46464',
        align: 'center',
        lineSpacing: 44
      } }
    timer = this.make.text(timerConf)

    const onEvent = () => {
      time--
      timer.setText(time)
    }
    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true
    })

    var halfTimeConf = {
      x: 300,
      y: 100,
      text: '30 seconds left ! ',
      style: {
        fontSize: '30px',
        fontFamily: 'Bangers',
        color: '#6aff00',
        align: 'center',
        lineSpacing: 44
      } }
    halfTime = this.make.text(halfTimeConf)

    halfTime.visible = false

    var pictureAppearConf = {
      x: 200,
      y: 100,
      text: '20 more seconds, hit him to gain 10 points ! ',
      style: {
        fontSize: '30px',
        fontFamily: 'Bangers',
        color: '#6aff00',
        align: 'center',
        lineSpacing: 44
      } }
    pictureAppear = this.make.text(pictureAppearConf)
    pictureAppear.visible = false

    const waitBall = () => {
      ballTime--
    }
    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: waitBall,
      callbackScope: this,
      loop: true
    })
  }

  update () {
    if (time < 30) {
      halfTime.visible = true
    }
    if (time < 28) {
      halfTime.visible = false
    }

    if (time < 20 && time > 18) {
      pictureAppear.visible = true
      Seb.body.setAllowGravity(true)
    }

    if (time < 15) {
      pictureAppear.visible = false
    }
    // player controls
    if (cursors.left.isDown) {
      player2.setVelocityX(-200)
    } else if (cursors.right.isDown) {
      player2.setVelocityX(200)
    } else {
      player2.setVelocityX(0)
    }

    if (cursors.up.isDown && player2.body.touching.down) {
      player2.setVelocityY(-230)
    }

    // player 2 controls
    if (keyQ.isDown) {
      player.setVelocityX(-200)
    } else if (keyD.isDown) {
      player.setVelocityX(200)
    } else {
      player.setVelocityX(0)
    }
    if (keyZ.isDown && player.body.touching.down) {
      player.setVelocityY(-230)
    }

    // ball reset & score handling

    if (this.physics.world.collide(logo, rightSide)) {
      logo.x = 550
      logo.y = 200
      logo.setVelocity(logoAccelerationX, logoAccelerationY)
      scorePlayer += 1
      scoreText.setText(`Score : ${scorePlayer}`)
      ballTime = 3
    }
    if (this.physics.world.collide(logo, leftSide)) {
      logo.x = 150
      logo.y = 200
      logo.setVelocity(logoAccelerationX, logoAccelerationY)
      scorePlayer2 += 1
      scorePlayer2Text.setText(`Score : ${scorePlayer2}`)
      ballTime = 3
    }

    if (this.physics.world.collide(Seb, rightSide)) {
      scorePlayer += 10
      Seb.destroy()
      scoreText.setText(`Score : ${scorePlayer}`)
    }
    if (this.physics.world.collide(Seb, leftSide)) {
      scorePlayer2 += 10
      Seb.destroy()
      scorePlayer2Text.setText(`Score : ${scorePlayer2}`)
    }

    if (this.physics.world.collide(logo, player)) {
      logo.body.setAllowGravity(false)
    }
    if (this.physics.world.collide(logo, player2)) {
      logo.body.setAllowGravity(false)
    }

    if (logo.y < 250) {
      logo.body.setAllowGravity(true)
    }

    if (time <= 0) {
      if (scorePlayer > scorePlayer2) {
        winner = 'Player 1'
      } else {
        winner = 'Player 2'
      }
      music.stop()
      this.scene.start('EndingScene', [winner, sound])
    }

    if (sound === false) {
      music.stop()
    }
  }
}
