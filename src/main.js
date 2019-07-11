import Phaser from 'phaser'
import BootScene from './scenes/LoadScene'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/Game'
import config from './config'

const gameConfig = Object.assign(config, {
  scene: [BootScene, MenuScene, GameScene]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()
