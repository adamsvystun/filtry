import { buildTree } from '../src/utils'

/**
 * utils test
 */
describe('utils test', () => {
    it('buildTree', () => {
        let equations = {
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
                op: '>=',
                value: 250
            },
            '3': {
                id: '3',
                type: 'and',
                equations: ['1', '2']
            }
        }
        let tree = buildTree(equations, '3')
        expect(tree).toEqual({
            id: '3',
            type: 'and',
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
                    op: '>=',
                    value: 250
                }
            }
        })
    })
})
