import filter from '../src/filtry'
import { FilterType } from '../src/types'

const d1 = {
    name: 'Adam',
    surname: 'Svystun',
    age: 21,
    alien: true,
    human: true,
    phones: ['123', '456'],
    birthday: new Date(2020, 5, 1),
}
const d2 = {
    name: 'Adam',
    surname: 'Crutun',
    age: 250,
    human: false,
    phones: ['789', '101', '123'],
    birthday: new Date(2020, 5, 1, 12, 31, 22, 900),
}
const d3 = {
    name: 'Marco',
    surname: 'Lenet',
    age: 18,
    phones: [],
    human: true,
    birthday: new Date(2020, 6, 1),
}

const data = [d1, d2, d3]

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
                    value: 'Adam',
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2])
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
                    value: null,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([])
    })

    it('filter isnull works', () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'alien',
                    op: 'isnull',
                    value: null,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2, d3])
    })

    it('filter through undefined values works', () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'alien',
                    op: '===',
                    value: true,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1])
    })

    it('filter through undefined values with contains works', () => {
        // This equation deosn't make sense on purpose
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'alien',
                    op: 'contains',
                    value: true,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([])
    })

    it('filter with root null is treated as no filter', () => {
        let equation: FilterType = {
            root: null,
            equations: {},
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual(data)
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
                    value: 18,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2])
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
                    value: 250,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d3])
    })

    it("operator '<' works on date", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'birthday',
                    op: '<',
                    value: new Date(2020, 5, 1, 13),
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2])
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
                    value: 250,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2, d3])
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
                    value: 250,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2])
    })

    it("operator '===' works on dates", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'birthday',
                    op: '===',
                    value: new Date(2020, 5, 1),
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1])
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
                    value: 250,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d3])
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
                    value: 'tun',
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2])
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
                    value: 'tun',
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d3])
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
                    value: ['Crutun', 'Svystun'],
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2])
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
                    value: ['Crutun', 'Svystun'],
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d3])
    })

    it("operator 'length>' works on string", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: 'length>',
                    value: 5,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1, d2])
    })

    it("operator 'length<' works on string", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: 'length<',
                    value: 6,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d3])
    })

    it("operator 'length=' works on string", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'surname',
                    op: 'length=',
                    value: 7,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d1])
    })

    it("operator 'length>' works on array", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'phones',
                    op: 'length>',
                    value: 2,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2])
    })

    it("operator 'length<' works on array", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'phones',
                    op: 'length<',
                    value: 2,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d3])
    })

    it("operator 'length=' works on array", () => {
        let equation: FilterType = {
            root: '1',
            equations: {
                '1': {
                    id: '1',
                    type: 'equation',
                    key: 'phones',
                    op: 'length=',
                    value: 3,
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2])
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
                    value: 250,
                },
                '2': {
                    id: '2',
                    type: 'equation',
                    key: 'name',
                    op: '===',
                    value: 'Adam',
                },
                '3': {
                    id: '3',
                    type: 'and',
                    equations: ['1', '2'],
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2])
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
                    value: 250,
                },
                '2': {
                    id: '2',
                    type: 'equation',
                    key: 'age',
                    op: '<',
                    value: 20,
                },
                '3': {
                    id: '3',
                    type: 'or',
                    equations: ['1', '2'],
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2, d3])
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
                    value: 250,
                },
                '2': {
                    id: '2',
                    type: 'equation',
                    key: null,
                    op: null,
                    value: null,
                },
                '3': {
                    id: '3',
                    type: 'or',
                    equations: ['1', '2'],
                },
            },
        }
        let filteredData = filter(data, equation)
        expect(filteredData).toEqual([d2])
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
                    value: 'Adam',
                },
            },
        }
        const data = [{ inside: d1 }, { inside: d2 }, { inside: d3 }]
        let filteredData = filter(data, equation, (row: any) => row.inside)
        expect(filteredData).toEqual([{ inside: d1 }, { inside: d2 }])
    })
})
