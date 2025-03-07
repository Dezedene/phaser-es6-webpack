import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  localStorageName: 'phaseres6webpack',

  render: {
    pixelArt: true
  }
}
