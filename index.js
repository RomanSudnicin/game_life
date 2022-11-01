const GameMap = require('./GameMap.js'),
    Game = require('./Game.js'),
    Drawer = require('./Drawer.js')

let startButton = document.getElementById('start'),
    pauseButton = document.getElementById('pause'),
    resetButton = document.getElementById('reset'),
    randomButton = document.getElementById('random'),
    canvas = document.getElementById('canvas')

let map = new GameMap({ width: 200, height: 150 }),
    game = new Game({ map }),
    drawer = new Drawer({ game, canvas })

startButton.addEventListener('click', () => game.start())
pauseButton.addEventListener('click', () => game.pause())
resetButton.addEventListener('click', () => game.reset())
randomButton.addEventListener('click', () => game.random())

game.random()
game.loop()
game.start()