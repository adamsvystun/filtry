export type Collection = Array<{}>

export type OperatorType =
    | '==='
    | '>'
    | '<'
    | '!=='
    | '<='
    | '>='
    | 'isnull'
    | '!isnull'
    | 'contains'
    | '!contains'
    | 'in'
    | '!in'

export type RegularEquationType = {
    id: string
    type: 'equation'
    key: string | null
    op: OperatorType | null
    value: any | null
}

export type OrEquationType = {
    id: string
    type: 'or'
    equations: Array<string>
}

export type AndEquationType = {
    id: string
    type: 'and'
    equations: Array<string>
}

export type OrEquationTreeType = {
    id: string
    type: 'or'
    equations: {
        [id: string]: AndEquationTreeType | RegularEquationType
    }
}

export type AndEquationTreeType = {
    id: string
    type: 'and'
    equations: {
        [id: string]: OrEquationTreeType | RegularEquationType
    }
}

export type EquationType = AndEquationType | OrEquationType | RegularEquationType
export type EquationTreeType = AndEquationTreeType | OrEquationTreeType | RegularEquationType

export type FilterType = {
    root: string | null | undefined
    equations: {
        [id: string]: EquationType | undefined
    }
}
