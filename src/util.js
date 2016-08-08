export function getFields (info) {
  const selections = info.fieldASTs[0].selectionSet.selections
  return selections.reduce((fields, selection) => {
    fields[selection.name.value] = selection
    return fields
  }, {})
}
