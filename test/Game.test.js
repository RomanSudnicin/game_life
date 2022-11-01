const assert = require('assert');
const expect = require('chai').expect;
const GameMap = require('../GameMap.js');
const Game = require('../Game.js')

describe('Game', () => {
    describe('#nextGeneration()', () => {
        let testBlock = new Map([
            ['1|1', { x: 1, y: 1 }],
            ['1|2', { x: 1, y: 2 }],
            ['2|1', { x: 2, y: 1 }],
            ['2|2', { x: 2, y: 2 }],
        ])

        let map = new GameMap({ width: 100, height: 100 }),
            game = new Game({ map })

        map.data = new Map(testBlock)

        it('Проверка фигурой "Блок": шаг 1', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testBlock)
        })
        it('Проверка фигурой "Блок": шаг 2', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testBlock)
        });
        it('Проверка фигурой "Блок": шаг 3', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testBlock)
        });

        let testSemaphore = new Map([
            ['1|3', { x: 1, y: 3 }],
            ['2|3', { x: 2, y: 3 }],
            ['3|3', { x: 3, y: 3 }],
        ])
        let testSemaphore2 = new Map([
            ['2|2', { x: 2, y: 2 }],
            ['2|3', { x: 2, y: 3 }],
            ['2|4', { x: 2, y: 4 }],
        ])

        it('Проверка фигурой "Семафор": шаг 1', () => {
            map.data = new Map(testSemaphore)
            game.nextGeneration()
            expect(game.map.data).deep.equal(testSemaphore2)
        })
        it('Проверка фигурой "Семафор": шаг 2', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testSemaphore)
        });
        it('Проверка фигурой "Семафор": шаг 3', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testSemaphore2)
        });

        let testGlider = new Map([
            ['3|1', { x: 3, y: 1 }],
            ['1|2', { x: 1, y: 2 }],
            ['3|2', { x: 3, y: 2 }],
            ['2|3', { x: 2, y: 3 }],
            ['3|3', { x: 3, y: 3 }],
        ])
        let testGlider2 = new Map([
            ['2|1', { x: 2, y: 1 }],
            ['3|2', { x: 3, y: 2 }],
            ['4|2', { x: 4, y: 2 }],
            ['2|3', { x: 2, y: 3 }],
            ['3|3', { x: 3, y: 3 }],
        ])
        let testGlider3 = new Map([
            ['2|3', { x: 2, y: 3 }],
            ['3|1', { x: 3, y: 1 }],
            ['3|3', { x: 3, y: 3 }],
            ['4|2', { x: 4, y: 2 }],
            ['4|3', { x: 4, y: 3 }],
        ])
        let testGlider4 = new Map([
            ['2|2', { x: 2, y: 2 }],
            ['4|2', { x: 4, y: 2 }],
            ['3|3', { x: 3, y: 3 }],
            ['4|3', { x: 4, y: 3 }],
            ['3|4', { x: 3, y: 4 }],
        ])

        it('Проверка фигурой "Глайдер": шаг 1', () => {
            map.data = new Map(testGlider)
            game.nextGeneration()
            expect(game.map.data).deep.equal(testGlider2)
        })
        it('Проверка фигурой "Глайдер": шаг 2', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testGlider3)
        });
        it('Проверка фигурой "Глайдер": шаг 3', () => {
            game.nextGeneration()
            expect(game.map.data).deep.equal(testGlider4)
        });
    });
    describe('#random()', () => {
        let map = new GameMap({ width: 100, height: 100 }),
            game = new Game({ map })

        it('Сравнение с пустой картой', () => {
            game.random()
            expect(game.map.data).deep.not.equal(new Map())
        });
    })
    describe('#reset()', () => {
        let map = new GameMap({ width: 100, height: 100 }),
            game = new Game({ map })

        game.random()

        it('Сравнение с пустой картой', () => {
            game.reset()
            expect(game.map.data).deep.equal(new Map())
        });
    })
});
