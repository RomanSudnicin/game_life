/**
 * Класс реализующий взаимодействие и хранение 
 * элементов карты игры "Жизнь" на поверхности тора
 */
class GameMap {
    /**
     * Инициализация карты
     */
    constructor({ width = 100, height = 100, data = (new Map()) } = {}) {
        this.width = width
        this.height = height
        this.data = data
    }

    /**
     * Генерация рандомных элементов на карте
     */
    random = () => {
        let data = new Map()

        Array.from({ length: this.width }).forEach((v, x) => {
            Array.from({ length: this.height }).forEach((v, y) => {
                if (Math.random() <= 0.5) return
                let item = this.xy(x, y)
                data.set(this.getKey(item), item)
            })
        })

        this.data = data
    }

    /**
     * Сброс карты
     */
    reset = () => {
        this.data = new Map()
    }

    /**
     * Подсчет соседних элементов
     */
    countAround = ({ x, y }) => {
        return this.neighbors({ x, y }).reduce((count, neighbor) => count + this.hasItem(neighbor), 0)
    }

    /**
     * Все элементы
     */
    getItems = () => {
        return this.data
    }

    /**
     * Элемент по координатам
     */
    getItem = ({ x, y }) => {
        return this.data.get(this.getKey({ x, y }))
    }

    /**
     * Добавить элемент
     */
    addItem = ({ x, y }) => {
        let item = this.xy(x, y)
        console.log(item)
        return this.data.set(this.getKey(item), item)
    }

    /**
     * Наличие элемента
     */
    hasItem = ({ x, y }) => {
        return this.data.has(this.getKey({ x, y }))
    }

    /**
     * Координаты соседних элементов
     */
    neighbors = ({ x, y }) => {
        return [
            this.xy(x - 1, y),
            this.xy(x + 1, y),
            this.xy(x, y - 1),
            this.xy(x, y + 1),
            this.xy(x - 1, y - 1),
            this.xy(x + 1, y - 1),
            this.xy(x - 1, y + 1),
            this.xy(x + 1, y + 1),
        ]
    }

    /**
     * Получить ключ элемента
     */
    getKey = ({ x, y }) => `${x}|${y}`

    /**
     * Преоброзование координат
     */
    xy = (x, y) => { return { x: (this.width + x) % this.width, y: (this.height + y) % this.height } }
}

module.exports = GameMap 