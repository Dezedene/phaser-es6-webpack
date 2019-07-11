/* globals __DEV__ */
import Phaser from 'phaser'

let ground
let leftSide
let rightSide
let ball
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

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}

  preload () {
    this.load.image('background', 'asserts/backgrounds/volcano-game-background-5.jpg')
    this.load.image('ground', 'asserts/Right-sideTransparent.png')
    this.load.image('ball', 'asserts/balls/BallTest.png')
    this.load.image('filet', 'asserts/Rectangle2.png')
    this.load.spritesheet('dude', 'asserts/characters/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create () {
    this.add.image(200, 280, 'background')

    ground = this.physics.add.staticGroup()
    leftSide = ground.create(175, 850, 'ground')
    rightSide = ground.create(625, 850, 'ground')

    const filet = this.physics.add.staticGroup()
    filet.create(400, 800, 'filet')

    player = this.physics.add.sprite(700, 150, 'dude')
    player2 = this.physics.add.sprite(100, 150, 'dude')

    player.body.setGravityY(60)
    player2.body.setGravity(60)

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    player2.setBounce(0.2)
    player2.setCollideWorldBounds(true)

    const particles = this.add.particles('ball')
    const emitter = particles.createEmitter({
      speed: { start: 10, end: 90 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    ball = this.physics.add.sprite(100, 100, 'ball')

    ball.body.setCircle(20)
    ball.setVelocity(100, 100)
    ball.setBounce(1, 1)
    ball.setCollideWorldBounds(true)
    this.physics.add.collider(ball, ground)
    this.physics.add.collider(ball, player)
    this.physics.add.collider(ball, player2)

    emitter.setAlpha(0.3)
    emitter.startFollow(ball)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.physics.add.collider(player, ground)
    this.physics.add.collider(player2, ground)

    this.physics.add.collider(filet, player2)
    this.physics.add.collider(filet, player)
    this.physics.add.collider(filet, ball)

    scoreText = this.add.text(25, 50, scorePlayer)
    scorePlayer2Text = this.add.text(700, 50, scorePlayer2)
  }

  update () {
    // player controls
    if (cursors.left.isDown) {
      player.setVelocityX(-200)

      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(200)

      player.anims.play('right', true)
    } else {
      player.setVelocityX(0)

      player.anims.play('turn')
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-230)
    }

    // player 2 controls
    if (keyQ.isDown) {
      player2.setVelocityX(-200)

      player2.anims.play('left', true)
    } else if (keyD.isDown) {
      player2.setVelocityX(200)

      player2.anims.play('right', true)
    } else {
      player2.setVelocityX(0)

      player2.anims.play('turn')
    }
    if (keyZ.isDown && player2.body.touching.down) {
      player2.setVelocityY(-230)
    }

    // ball reset & score handling

    if (this.physics.world.collide(ball, rightSide)) {
      ball.x = 450
      ball.y = 100
      ball.setVelocity(100, 200)
      scorePlayer += 1
      scoreText.setText(`Score : ${scorePlayer}`)
    }
    if (this.physics.world.collide(ball, leftSide)) {
      ball.x = 450
      ball.y = 100
      ball.setVelocity(100, 200)
      scorePlayer2 += 1
      scorePlayer2Text.setText(`Score : ${scorePlayer2}`)
    }
    if (this.physics.world.collide(ball, player)) {
      var diff = 0

      if (ball.x < player.x) {
        //  Ball is on the left-hand side of the paddle
        diff = player.x - ball.x
        ball.setVelocityY(-10 * diff)
      } else if (ball.x > player.x) {
        //  Ball is on the right-hand side of the player
        diff = ball.x - player.x
        ball.setVelocityY(10 * diff)
      } else {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.setVelocityY(2 + Math.random() * 8)
      }
    }
  }
}
