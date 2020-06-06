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

    it('filter with no operands works', () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: null,
                    op: null,
                    value: null
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([])
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

    it("operator '!==' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'age',
                    op: '!==',
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

    it("operator 'in' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: 'in',
                    value: ['Crutun', 'Svystun']
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([
            { name: 'Adam', surname: 'Svystun', age: 21, human: true },
            { name: 'Adam', surname: 'Crutun', age: 250, human: false }
        ])
    })

    it("operator '!in' works", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: '!in',
                    value: ['Crutun', 'Svystun']
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

    it("'or' equation with second null equation works", () => {
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
                    key: null,
                    op: null,
                    value: null
                },
                '3': {
                    id: '3',
                    type: 'or',
                    equations: ['1', '2']
                }
            }
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([{ name: 'Adam', surname: 'Crutun', age: 250, human: false }])
    })

    it('getData argument works', () => {
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
        const data = [
            { inside: { name: 'Adam', surname: 'Svystun', age: 21, human: true } },
            { inside: { name: 'Adam', surname: 'Crutun', age: 250, human: false } },
            { inside: { name: 'Marco', surname: 'Lenet', age: 18, human: true } }
        ]
        let filteredData = filter(data, equation, (row: any) => row.inside)
        expect(filteredData).toEqual([
            { inside: { name: 'Adam', surname: 'Svystun', age: 21, human: true } },
            { inside: { name: 'Adam', surname: 'Crutun', age: 250, human: false } }
        ])
    })
})
