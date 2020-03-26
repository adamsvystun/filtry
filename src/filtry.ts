import { Collection, FilterType, EquationTreeType } from './types'
import { buildTree } from './utils'

const filterRowByEquation = (filterNode: EquationTreeType, row: Object): boolean => {
    if (filterNode.type === 'equation') {
        switch (filterNode.op) {
            case '===': {
                // @ts-ignore
                return row[filterNode.key] === filterNode.value
            }
            case '!==': {
                // @ts-ignore
                return row[filterNode.key] !== filterNode.value
            }
            case '<': {
                // @ts-ignore
                return row[filterNode.key] < filterNode.value
            }
            case '>': {
                // @ts-ignore
                return row[filterNode.key] > filterNode.value
            }
            case '<=': {
                // @ts-ignore
                return row[filterNode.key] <= filterNode.value
            }
            case '>=': {
                // @ts-ignore
                return row[filterNode.key] >= filterNode.value
            }
            case 'contains': {
                // @ts-ignore
                return row[filterNode.key].includes(filterNode.value)
            }
            case '!contains': {
                // @ts-ignore
                return !row[filterNode.key].includes(filterNode.value)
            }
        }
    } else if (filterNode.type === 'and') {
        for (let equation of Object.values(filterNode.equations)) {
            if (!filterRowByEquation(equation, row)) {
                return false
            }
        }
        return true
    } else if (filterNode.type === 'or') {
        for (let equation of Object.values(filterNode.equations)) {
            if (filterRowByEquation(equation, row)) {
                return true
            }
        }
        return false
    }
    throw new Error('Unsupported equation type given: ' + filterNode)
}

const buildFilterTree = (filter: FilterType): EquationTreeType => {
    return buildTree(filter.equations, filter.root) as EquationTreeType
}

const filter = (data: Collection, filter: FilterType) => {
    let filterTree: EquationTreeType = buildFilterTree(filter)
    let filterFunction = (row: any) => filterRowByEquation(filterTree, row)
    return data.filter(filterFunction)
}

export { filter, buildFilterTree }
export default filter
