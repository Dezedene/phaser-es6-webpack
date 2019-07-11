/* globals __DEV__ */
import Phaser from 'phaser'

let ground
let leftSide
let rightSide
let logo
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
    this.load.image('sky', 'asserts/backgrounds/volcano-game-background-5.jpg')
    this.load.image('ground', 'asserts/Right-sideTransparent.png')
    this.load.image('logo', 'asserts/balls/BallTest.png')
    this.load.image('filet', 'asserts/Rectangle2.png')
    this.load.spritesheet('dude', 'asserts/characters/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create () {
    this.add.image(200, 280, 'sky')

    ground = this.physics.add.staticGroup()
    leftSide = ground.create(175, 850, 'ground')
    rightSide = ground.create(625, 850, 'ground')

    const filet = this.physics.add.staticGroup()
    filet.create(400, 800, 'filet')

    player = this.physics.add.sprite(700, 150, 'dude')
    player2 = this.physics.add.sprite(100, 150, 'dude')

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    player2.setBounce(0.2)
    player2.setCollideWorldBounds(true)

    const particles = this.add.particles('logo')
    const emitter = particles.createEmitter({
      speed: { start: 10, end: 90 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    logo = this.physics.add.sprite(150, 100, 'logo')

    logo.body.setCircle(20)
    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)
    this.physics.add.collider(logo, ground)
    this.physics.add.collider(logo, player)
    this.physics.add.collider(logo, player2)

    emitter.setAlpha(0.3)
    emitter.startFollow(logo)

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
    this.physics.add.collider(filet, logo)

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

    if (this.physics.world.collide(logo, rightSide)) {
      logo.x = 450
      logo.y = 100
      logo.setVelocity(100, 200)
      scorePlayer += 1
      scoreText.setText(`Score : ${scorePlayer}`)
    }
    if (this.physics.world.collide(logo, leftSide)) {
      logo.x = 450
      logo.y = 100
      logo.setVelocity(100, 200)
      scorePlayer2 += 1
      scorePlayer2Text.setText(`Score : ${scorePlayer2}`)
    }
  }
}
