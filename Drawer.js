/**
 * Класс реализующий графическую визуализацию игры и функцию "Рисование" на карте
 */
class Drawer {
    /**
     * Инициализация отрисовки
     */
    constructor({ game, canvas } = {}) {
        this.game = game
        this.map = game.map
        this.canvas = canvas
        this.canvas.addEventListener('mousedown', this.mousedownHandler)
        this.canvas.addEventListener('mouseup', this.mouseupHandler)
        this.canvas.addEventListener('mousemove', this.mousemovetHandler)
        this.context = canvas.getContext("2d")

        this.width = canvas.offsetWidth
        this.height = canvas.offsetHeight

        canvas.width = this.width
        canvas.height = this.height

        this.sizeX = this.width / map.width
        this.sizeY = this.height / map.height

        this.mouseDown = false
        this.mouseX = 0
        this.mouseY = 0

        game.addListener('tick', () => {
            this.paint()
            this.render()
        })
    }

    /**
     * Отрисовка карты
     */
    render = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "#000000"

        this.map.getItems().forEach((item) => {
            this.context.fillRect(item.x * this.sizeX, item.y * this.sizeY, this.sizeX, this.sizeY)
        })
    }

    /**
     * "Рисование" курсором на карте
     */
    paint = () => {
        if (this.mouseDown) this.map.addItem({
            x: Math.round(this.mouseX / (this.canvas.offsetWidth / this.map.width)),
            y: Math.round(this.mouseY / (this.canvas.offsetHeight / this.map.height))
        })
    }

    mousedownHandler = () => {
        this.mouseDown = true
        this.togglePause(this.mouseDown)
    }
    mouseupHandler = () => {
        this.mouseDown = false
        this.togglePause(this.mouseDown)
    }
    mousemovetHandler = ({ x, y }) => {
        this.mouseX = x
        this.mouseY = y
    }

    togglePause = (pause) => {
        if (pause) {
            this._gameRun = this.game.run
            this.game.pause()
        } else {
            if (this._gameRun) this.game.start()
        }
    }
}

module.exports = Drawer 