import { Collection, FilterType, EquationTreeType } from './types'
import { buildTree } from './utils'

const filterRowByEquation = (
    filterNode: EquationTreeType,
    row: Object,
    getData: Function | null
): boolean => {
    if (filterNode.type === 'equation') {
        const isDate = filterNode.value instanceof Date
        if (getData) {
            row = getData(row)
        }
        if (filterNode.key === null || filterNode.op === null) {
            return false
        }
        // @ts-ignore
        const rowValue = row[filterNode.key]
        switch (filterNode.op) {
            case '===': {
                if (isDate) {
                    if (!rowValue && filterNode.value) {
                        return false
                    }
                    if (!filterNode.value) {
                        return true
                    }
                    return rowValue.getTime() === filterNode.value.getTime()
                }
                return rowValue === filterNode.value
            }
            case '!==': {
                return rowValue !== filterNode.value
            }
            case 'isnull': {
                return rowValue == null
            }
            case '!isnull': {
                return rowValue != null
            }
            case '<': {
                return rowValue < filterNode.value
            }
            case '>': {
                return rowValue > filterNode.value
            }
            case '<=': {
                return rowValue <= filterNode.value
            }
            case '>=': {
                return rowValue >= filterNode.value
            }
            case 'contains': {
                if (rowValue == null || typeof rowValue.includes !== 'function') {
                    return false
                }
                return rowValue.includes(filterNode.value)
            }
            case '!contains': {
                if (rowValue == null || typeof rowValue.includes !== 'function') {
                    return true
                }
                return !rowValue.includes(filterNode.value)
            }
            case 'in': {
                if (filterNode.value == null || typeof filterNode.value.includes !== 'function') {
                    return false
                }
                return filterNode.value.includes(rowValue)
            }
            case '!in': {
                if (filterNode.value == null || typeof filterNode.value.includes !== 'function') {
                    return true
                }
                return !filterNode.value.includes(rowValue)
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
