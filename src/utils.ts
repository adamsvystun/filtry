export const buildTree = (object: Object, id: any, childrenKey: any = 'equations'): Object => {
    // @ts-ignore
    let res = { ...object[id] }
    if (res[childrenKey]) {
        let newChildren = {}
        for (let childId of res[childrenKey]) {
            // @ts-ignore
            newChildren[childId] = buildTree(object, childId)
        }
        res[childrenKey] = newChildren
    }
    return res
}
