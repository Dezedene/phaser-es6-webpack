/* globals __DEV__ */
import Phaser from 'phaser'

let player
let player2
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
    this.load.image('ground', 'asserts/ground/Bastest.png')
    this.load.image('ball', 'asserts/balls/volleyball.png')
    this.load.image('filet', 'asserts/set/set.png')
    this.load.spritesheet('dude', 'asserts/characters/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create () {
    this.add.image(900, 480, 'background').setScale(2)

    const ground = this.physics.add.staticGroup()
    ground.create(1070, 1140, 'ground')

    const filet = this.physics.add.staticGroup()
    filet.create(1070, 1300, 'filet')

    const particles = this.add.particles('red')

    player = this.physics.add.sprite(700, 150, 'dude')
    player2 = this.physics.add.sprite(100, 150, 'dude')

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    player2.setBounce(0.2)
    player2.setCollideWorldBounds(true)

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    const ball = this.physics.add.image(1000, 500, 'ball')

    ball.setVelocity(100, 200)
    ball.setBounce(1, 1)
    ball.setCollideWorldBounds(true)
    this.physics.add.collider(ball, ground)
    this.physics.add.collider(ball, filet)

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
  }

  update () {
    if (cursors.left.isDown) {
      player.setVelocityX(-160)

      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(160)

      player.anims.play('right', true)
    } else {
      player.setVelocityX(0)

      player.anims.play('turn')
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-230)
    }

    // player 2
    if (keyQ.isDown) {
      player2.setVelocityX(-160)

      player2.anims.play('left', true)
    } else if (keyD.isDown) {
      player2.setVelocityX(160)

      player2.anims.play('right', true)
    } else {
      player2.setVelocityX(0)

      player2.anims.play('turn')
    }
    if (keyZ.isDown && player2.body.touching.down) {
      player2.setVelocityY(-230)
    }
  }
}
