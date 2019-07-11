import Phaser from 'phaser'

let tst = false
let text = 'Toto'

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

    this.add.text(0, 0, text)

    if (tst) {
      this.scene.start('GameScene')
    }
  }

  update () {}
}
