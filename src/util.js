import util from 'util'

export function getFields (info) {
  if (info.kind !== 'Field') {
    info = info.fieldNodes[0]
  }
  const selections = info.selectionSet.selections
  return selections.reduce((fields, selection) => {
    fields[selection.name.value] = selection
    return fields
  }, {})
}

export function prettyPrint (obj, { depth = 5,
                                    colors = true,
                                    breakLength = 120 } = {}) {
  console.log(util.inspect(obj, { depth, colors, breakLength }))
}

export function toFilteredArray (obj) {
  return (Array.isArray(obj) ? obj : [obj]).filter(x => x)
}

export function extendIncludes (includes, moreIncludes) {
  includes = toFilteredArray(includes)
  moreIncludes = toFilteredArray(moreIncludes)
  const seen = {}
  return includes.concat(moreIncludes).filter(x => {
    if (seen[x]) {
      return false
    }
    seen[x] = true
    return true
  })
}
