import Phaser from 'phaser'

let tst = false
let text = 'Toto'

console.log(tst)

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  init () {
  }

  preload () {
    //
    // load your assets
    //
  }

  create () {
    this.add.text(0, 0, text)

    if (!tst) {
      this.scene.start('GameScene')
    }
  }

  update () {}
}
