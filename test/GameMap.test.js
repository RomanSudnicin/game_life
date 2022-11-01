const expect = require('chai').expect;
const GameMap = require('../GameMap.js')

describe('GameMap', () => {
    describe('#countAround()', () => {
        let testSemaphore = new Map([
            ['1|3', { x: 1, y: 3 }],
            ['2|3', { x: 2, y: 3 }],
            ['3|3', { x: 3, y: 3 }],
        ])
        let map = new GameMap({ width: 100, height: 100 })
        map.data = testSemaphore

        it('Подсчёт двух соседей', () => {
            expect(map.countAround({ x: 2, y: 3 })).equal(2)
        });
        it('Подсчёт на пустой карте', () => {
            map.reset()
            expect(map.countAround({ x: 2, y: 3 })).equal(0)
        });
    })
    describe('#neighbors()', () => {
        let map = new GameMap({ width: 100, height: 100 })
        let testNeighbors = [
            { x: 1, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: 3 },
            { x: 1, y: 1 },
            { x: 3, y: 1 },
            { x: 1, y: 3 },
            { x: 3, y: 3 },
        ]

        it('Координаты соседних элементов', () => {
            expect(map.neighbors({ x: 2, y: 2 })).deep.equal(testNeighbors)
        });
    })
    describe('#hasItem()', () => {
        let testSemaphore = new Map([
            ['1|3', { x: 1, y: 3 }],
            ['2|3', { x: 2, y: 3 }],
            ['3|3', { x: 3, y: 3 }],
        ])
        let map = new GameMap({ width: 100, height: 100 })
        map.data = testSemaphore

        it('Существование элеменита', () => {
            expect(map.hasItem({ x: 2, y: 3 })).equal(true)
        });
    })
    describe('#random()', () => {
        let map = new GameMap({ width: 100, height: 100 })

        it('Сравнение с пустой картой', () => {
            map.random()
            expect(map.data).deep.not.equal(new Map())
        });
    })
    describe('#reset()', () => {
        let map = new GameMap({ width: 100, height: 100 })
        map.random()

        it('Сравнение с пустой картой', () => {
            map.reset()
            expect(map.data).deep.equal(new Map())
        });
    })
});
