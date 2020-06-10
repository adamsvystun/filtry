import { Collection, FilterType, EquationTreeType } from './types'
import { buildTree } from './utils'

const filterRowByEquation = (
    filterNode: EquationTreeType,
    row: Object,
    getData: Function | null
): boolean => {
    if (filterNode.type === 'equation') {
        if (getData) {
            row = getData(row)
        }
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
            case 'in': {
                // @ts-ignore
                return filterNode.value.includes(row[filterNode.key])
            }
            case '!in': {
                // @ts-ignore
                return !filterNode.value.includes(row[filterNode.key])
            }
        }
        return false
    } else if (filterNode.type === 'and') {
        for (let equation of Object.values(filterNode.equations)) {
            if (!filterRowByEquation(equation, row, getData)) {
                return false
            }
        }
        return true
    } else if (filterNode.type === 'or') {
        for (let equation of Object.values(filterNode.equations)) {
            if (filterRowByEquation(equation, row, getData)) {
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

const filter = (
    data: Collection,
    filter: FilterType,
    getData: Function | null = null
): Collection => {
    if (filter.root === null || filter.root === undefined) {
        return data
    }
    let filterTree: EquationTreeType = buildFilterTree(filter)
    let filterFunction = (row: any) => filterRowByEquation(filterTree, row, getData)
    return data.filter(filterFunction)
}

export { filter, buildFilterTree }
export default filter
