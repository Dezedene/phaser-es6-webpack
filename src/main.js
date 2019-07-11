import Phaser from 'phaser'
import LoadScene from './scenes/LoadScene'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/Game'
import config from './config'

const gameConfig = Object.assign(config, {
  scene: [LoadScene, MenuScene, GameScene]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()
