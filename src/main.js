import Phaser from 'phaser'
import LoadScene from './scenes/LoadScene'
import MenuScene from './scenes/MenuScene'
import OptionScene from './scenes/OptionScene'
import GameScene from './scenes/Game'
import EndingScene from './scenes/EndingScene'
import config from './config'

const gameConfig = Object.assign(config, {
  scene: [LoadScene, MenuScene, OptionScene, GameScene, EndingScene]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
