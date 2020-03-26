export type Collection = Array<{}>

export type OperatorType = '===' | '>' | '<' | '!==' | '<=' | '>=' | 'contains' | '!contains'

export type RegularEquationType = {
    id: string
    type: 'equation'
    key: string
    op: OperatorType
    value: any
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
    root: string
    equations: {
        [id: string]: EquationType | undefined
    }
}
