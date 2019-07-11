import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  init (data) {
    console.log(data)
    console.log('I got it')
  }

  preload () {
    //
    // load your assets
    //
  }

  create () {
    this.scene.start('GameScene')
  }

  update () {}
}
