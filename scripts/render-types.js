import marked from 'marked'
const schema = require('../schema.json').data.__schema

marked.setOptions({
  breaks: false
})

function markdown (markup) {
  return marked(markup || '')
    .replace(/<\/p>\s*<p>/g, '<br><br>')
    .replace(/<\/?p>/g, '')
    .trim()
}

function sortBy (arr, property) {
  arr.sort((a, b) => {
    const aValue = a[property]
    const bValue = b[property]
    if (aValue > bValue) return 1
    if (bValue > aValue) return -1
    return 0
  })
}

function renderType (type) {
  if (type.kind === 'NON_NULL') {
    return renderType(type.ofType) + '!'
  }
  if (type.kind === 'LIST') {
    return `[${renderType(type.ofType)}]`
  }
  return `[${type.name}](#${type.name.toLowerCase()})`
}

function renderObject (type, { skipTitle = false } = {}) {
  if (!skipTitle) {
    console.log(`\n### ${type.name}\n`)
  }
  if (type.description) {
    console.log(`${type.description}\n`)
  }
  console.log('<table><thead>')
  console.log('  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>')
  console.log('</thead><tbody>')
  type.fields.forEach(field => {
    console.log('  <tr>')
    console.log(`    <td valign="top"><strong>${field.name}</strong></td>`)
    console.log(`    <td valign="top">${markdown(renderType(field.type))}</td>`)
    console.log(`    <td>${markdown(field.description)}</td>`)
    console.log('  </tr>')
    if (field.args.length) {
      field.args.forEach((arg, i) => {
        console.log('  <tr>')
        console.log(`    <td align="right" valign="top">${arg.name}</td>`)
        console.log(`    <td valign="top">${renderType(arg.type)}</td>`)
        console.log(`    <td>${markdown(arg.description)}</td>`)
        console.log('  </tr>')
      })
    }
  })
  console.log('</tbody></table>')
}

const types = schema.types.filter(type => !type.name.startsWith('__'))
const query = types.filter(type => type.name === schema.queryType.name)[0]
const objects = types.filter(type => type.kind === 'OBJECT' && type !== query)
const enums = types.filter(type => type.kind === 'ENUM').sort()
const scalars = types.filter(type => type.kind === 'SCALAR').sort()
const interfaces = types.filter(type => type.kind === 'INTERFACE').sort()

sortBy(objects, 'name')
sortBy(enums, 'name')
sortBy(scalars, 'name')
sortBy(interfaces, 'name')

console.log('# Schema Types\n')

console.log('You may also be interested in the [schema in GraphQL syntax](schema.md).\n')

console.log('<details><summary>**Table of Contents**</summary><p><ul>')
console.log('  <li>[Query](#query)</li>')
console.log('  <li>[Objects](#objects)<ul>')
objects.forEach(type => {
  console.log(`    <li>[${type.name}](#${type.name.toLowerCase()})</li>`)
})
console.log('  </ul></li>')
console.log('  <li>[Enums](#enums)<ul>')
enums.forEach(type => {
  console.log(`    <li>[${type.name}](#${type.name.toLowerCase()})</li>`)
})
console.log('  </ul></li>')
console.log('  <li>[Scalars](#scalars)<ul>')
scalars.forEach(type => {
  console.log(`    <li>[${type.name}](#${type.name.toLowerCase()})</li>`)
})
console.log('  </ul></li>')
console.log('  <li>[Interfaces](#interfaces)<ul>')
interfaces.forEach(type => {
  console.log(`    <li>[${type.name}](#${type.name.toLowerCase()})</li>`)
})
console.log('  </ul></li>')
console.log('</ul></p></details>')

console.log(`\n## Query ${query.name === 'Query' ? '' : '(' + query.name + ')'}`)
renderObject(query, { skipTitle: true })

console.log('\n## Objects')
objects.forEach(type => renderObject(type))

console.log('\n## Enums')

enums.forEach(type => {
  console.log(`\n### ${type.name}\n`)
  if (type.description) {
    console.log(`${type.description}\n`)
  }
  console.log('<table><thead>')
  console.log('  <th>Value</th><th>Description</th>')
  console.log('</thead><tbody>')
  type.enumValues.forEach(value => {
    console.log('  <tr>')
    console.log(`    <td valign="top"><strong>${value.name}</strong></td>`)
    console.log(`    <td>${markdown(value.description)}</td>`)
    console.log('  </tr>')
  })
  console.log('</tbody></table>')
})

console.log('\n## Scalars\n')

scalars.forEach(type => {
  console.log(`### ${type.name}\n`)
  if (type.description) {
    console.log(`${type.description}\n`)
  }
})

console.log('\n## Interfaces\n')

interfaces.forEach(type => {
  console.log(`### ${type.name}\n`)
  if (type.description) {
    console.log(`${type.description}\n`)
  }
})
