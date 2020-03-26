import filter from '../src/filtry'
import { FilterType } from '../src/types'

const data = [
    { name: 'Adam', surname: 'Svystun', age: 21, human: true },
    { name: 'Adam', surname: 'Crutun', age: 250, human: false },
    { name: 'Marco', surname: 'Lenet', age: 18, human: true }
]

/**
 * filter test
 */
describe('filter test', () => {
    it('simple filter works', () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'name',
                    op: '===',
                    value: 'Adam'
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Svystun', age: 21, human: true },
            { name: 'Adam', surname: 'Crutun', age: 250, human: false }
        ])
    })

    it("operator '>' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '>',
                    value: 18
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Svystun', age: 21, human: true },
            { name: 'Adam', surname: 'Crutun', age: 250, human: false }
        ])
    })

    it("operator '<' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '<',
                    value: 250
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Svystun', age: 21, human: true },
            { name: 'Marco', surname: 'Lenet', age: 18, human: true }
        ])
    })

    it("operator '<=' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '<=',
                    value: 250
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Svystun', age: 21, human: true },
            { name: 'Adam', surname: 'Crutun', age: 250, human: false },
            { name: 'Marco', surname: 'Lenet', age: 18, human: true }
        ])
    })

    it("operator '>=' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '>=',
                    value: 250
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([{ name: 'Adam', surname: 'Crutun', age: 250, human: false }])
    })

    it("operator 'contains' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: 'contains',
                    value: 'tun'
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Svystun', age: 21, human: true },
            { name: 'Adam', surname: 'Crutun', age: 250, human: false }
        ])
    })

    it("operator '!contains' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: '!contains',
                    value: 'tun'
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([{ name: 'Marco', surname: 'Lenet', age: 18, human: true }])
    })

    it("'and' equation works", () => {
        let equation: FilterType = {
            root: '3',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '>=',
                    value: 250
                },
                '2': {
                    id: '2',
                    type: 'equation',
                    key: 'name',
                    op: '===',
                    value: 'Adam'
                },
                '3': {
                    id: '3',
                    type: 'and',
                    equations: ['1', '2']
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([{ name: 'Adam', surname: 'Crutun', age: 250, human: false }])
    })

    it("'or' equation works", () => {
        let equation: FilterType = {
            root: '3',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '>=',
                    value: 250
                },
                '2': {
                    id: '2',
                    type: 'equation',
                    key: 'age',
                    op: '<',
                    value: 20
                },
                '3': {
                    id: '3',
                    type: 'or',
                    equations: ['1', '2']
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Crutun', age: 250, human: false },
            { name: 'Marco', surname: 'Lenet', age: 18, human: true }
        ])
    })
})
