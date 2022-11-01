/**
 * Класс рализующий логику и управление игры "Жизнь"
 */
class Game {
    /**
     * Инициализация игры
     */
    constructor({ map } = {}) {
        this.map = map
        this.run = true
        this.eventHandlers = {}
    }

    /**
     * Зацикливание логики игры
     */
    loop = () => {
        this.tick()
        setTimeout(() => this.loop(), 10)
    }

    /**
     * Один шаг игры
     */
    tick = () => {
        if (this.run) this.nextGeneration()
        this.on('tick')
    }

    /**
     * Генерация нового поколения элементов
     */
    nextGeneration = () => {
        let data = new Map(), checked = {}

        this.map.getItems().forEach((item) => {
            const count = this.map.countAround(item)

            if (count === 2 || count === 3) {
                data.set(this.map.getKey(item), item)
            }

            this.map.neighbors(item).forEach((neighbor) => {
                if (checked[this.map.getKey(neighbor)]) return
                checked[this.map.getKey(neighbor)] = true

                if (this.map.countAround(neighbor) !== 3) return
                data.set(this.map.getKey(neighbor), neighbor)
            })
        })
        this.map.data = data
    }

    start = () => this.run = true
    pause = () => this.run = false
    reset = () => this.map.reset()
    random = () => this.map.random()

    /**
     * Запуск события
     */
    on = (eventName, data = null) => {
        if (eventName in this.eventHandlers)
            this.eventHandlers[eventName].forEach((callback) => callback(data))
    }
    /**
     * Добавление слушаетеля событий
     */
    addListener = (eventName, callback) => {
        if (eventName in this.eventHandlers)
            this.eventHandlers[eventName].push(callback)
        else
            this.eventHandlers[eventName] = [callback]
    }
}

module.exports = Game