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
    this.load.image('white', 'asserts/White-Background.png')
    this.load.image('back', 'asserts/Pionk.png')
    this.load.image('sky', 'asserts/backgrounds/volcano-game-background-5.jpg')
    this.load.image('ground', 'src/assert/decor/translucent_floor.png')
    this.load.image('logo', 'asserts/balls/volleyball.png')
    this.load.image('filet', 'asserts/set/set.png')
    this.load.spritesheet('dude', 'asserts/characters/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create () {
    this.add.image(900, 480, 'sky').setScale(2)

    const ground = this.physics.add.staticGroup()
    ground.create(1060, 1300, 'ground')

    const filet = this.physics.add.staticGroup()
    filet.create(1070, 1300, 'filet')

    const particles = this.add.particles('red')

    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 500, 'ground')
    platforms.create(800, 1168, 'back').setScale(3).refreshBody()

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

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)
    this.physics.add.collider(logo, ground)
    this.physics.add.collider(logo, filet)

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

    this.physics.add.collider(player, platforms)
    this.physics.add.collider(player2, platforms)
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
