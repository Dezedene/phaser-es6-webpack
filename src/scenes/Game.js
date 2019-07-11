/* globals __DEV__ */
import Phaser from 'phaser'

let ground
let leftSide
let rightSide
let logo
let logoAccelerationX = 100
let logoAccelerationY = 100
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

let time = 60
let timer
let timedEvent

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}

  preload () {
    this.load.image('sky', 'asserts/backgrounds/volcano-game-background-5.jpg')
    this.load.image('ground', 'asserts/Right-sideTransparent.png')
    this.load.image('logo', 'asserts/balls/BallTest.png')
    this.load.image('filet', 'asserts/Rectangle2.png')
    this.load.image('Seb', 'asserts/characters/Seb.png')
    this.load.spritesheet('dude', 'asserts/characters/Lapin.png', { frameWidth: 40, frameHeight: 40 })
  }

  create () {
    this.add.image(200, 280, 'sky')

    const dynamic = this.physics.add.group()

    Seb = dynamic.create(400, 0, 'Seb')

    ground = this.physics.add.staticGroup()
    leftSide = ground.create(175, 850, 'ground')
    rightSide = ground.create(625, 850, 'ground')

    const filet = this.physics.add.staticGroup()
    filet.create(400, 800, 'filet')

    player = this.physics.add.sprite(700, 350, 'dude')
    player2 = this.physics.add.sprite(100, 350, 'dude')

    player.setCollideWorldBounds(true)
    player2.setCollideWorldBounds(true)

    const particles = this.add.particles('logo')
    const emitter = particles.createEmitter({
      speed: { start: 10, end: 90 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    logo = this.physics.add.image(150, 100, 'logo')

    logo.body.setCircle(20)
    logo.setVelocity(logoAccelerationX, logoAccelerationY)
    logo.setBounce(1.2, 1.2)
    logo.setCollideWorldBounds(true)
    this.physics.add.collider(logo, ground)
    this.physics.add.collider(logo, player)
    this.physics.add.collider(logo, player2)

    emitter.setAlpha(0.3)
    emitter.startFollow(logo)

    cursors = this.input.keyboard.createCursorKeys()
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.physics.add.collider(player, ground)
    this.physics.add.collider(player2, ground)

    this.physics.add.collider(filet, player2)
    this.physics.add.collider(filet, player)
    this.physics.add.collider(filet, logo)

    this.physics.add.collider(logo, Seb)
    this.physics.add.collider(Seb, filet)

    scoreText = this.add.text(25, 50, scorePlayer)
    scorePlayer2Text = this.add.text(700, 50, scorePlayer2)
    timer = this.add.text(400, 50, time)

    const onEvent = () => {
      time--
      timer.setText(time)
    }
    timedEvent = this.time.addEvent({
      delay: 1000, // ms
      callback: onEvent,
      // args: [],
      callbackScope: this,
      loop: true
    })
  }

  update () {
    // player controls
    if (cursors.left.isDown) {
      player.setVelocityX(-200)
    } else if (cursors.right.isDown) {
      player.setVelocityX(200)
    } else {
      player.setVelocityX(0)
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-230)
    }

    // player 2 controls
    if (keyQ.isDown) {
      player2.setVelocityX(-200)
    } else if (keyD.isDown) {
      player2.setVelocityX(200)
    } else {
      player2.setVelocityX(0)
    }
    if (keyZ.isDown && player2.body.touching.down) {
      player2.setVelocityY(-230)
    }

    // ball reset & score handling

    if (this.physics.world.collide(logo, rightSide)) {
      logo.x = 550
      logo.y = 300
      logo.setVelocity(logoAccelerationX, logoAccelerationY)
      scorePlayer += 1
      scoreText.setText(`Score : ${scorePlayer}`)
    }
    if (this.physics.world.collide(logo, leftSide)) {
      logo.x = 150
      logo.y = 300
      logo.setVelocity(logoAccelerationX, logoAccelerationY)
      scorePlayer2 += 1
      scorePlayer2Text.setText(`Score : ${scorePlayer2}`)
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
  }
}
