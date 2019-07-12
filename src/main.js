import Phaser from 'phaser'
import LoadScene from './scenes/LoadScene'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/Game'
import EndingScene from './scenes/EndingScene'
import config from './config'

const gameConfig = Object.assign(config, {
  scene: [LoadScene, MenuScene, GameScene, EndingScene]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()
