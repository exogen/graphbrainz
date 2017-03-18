import marked from 'marked'
const schema = require('../schema.json').data.__schema

// Ideally, we could just spit out the existing description Markdown everywhere
// and leave it to be rendered by whatever processes the output. But some
// Markdown renderers, including GitHub's, don't process Markdown if it's within
// an HTML tag. So in some places (like descriptions of the types themselves) we
// just output the raw description. In other places, like table cells, we need
// to output pre-rendered Markdown, otherwise GitHub won't interpret it.
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
  console.log('  <tr>')
  console.log('    <th align="left">Field</th>')
  console.log('    <th align="right">Argument</th>')
  console.log('    <th align="left">Type</th>')
  console.log('    <th align="left">Description</th>')
  console.log('  </tr>')
  console.log('</thead><tbody>')
  type.fields.forEach(field => {
    console.log('  <tr>')
    console.log(`    <td colspan="2" valign="top"><strong>${field.name}</strong> ${field.isDeprecated ? '⚠️' : ''}</td>`)
    console.log(`    <td valign="top">${markdown(renderType(field.type))}</td>`)
    console.log(`    <td>`)
    console.log(`      ${markdown(field.description)}`)
    if (field.isDeprecated) {
      console.log('      <br/><br/><p>⚠️ <strong>DEPRECATED</strong></p>')
      console.log(`      <blockquote>${markdown(field.deprecationReason)}</blockquote>`)
    }
    console.log('    </td>')
    console.log('  </tr>')
    if (field.args.length) {
      field.args.forEach((arg, i) => {
        console.log('  <tr>')
        console.log(`    <td colspan="2" align="right" valign="top">${arg.name}</td>`)
        console.log(`    <td valign="top">${markdown(renderType(arg.type))}</td>`)
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

console.log('You may also be interested in reading the [schema in GraphQL syntax](schema.md).\n')

console.log('<details>')
console.log('  <summary><strong>Table of Contents</strong></summary>\n')
console.log('  * [Query](#query)')
console.log('  * [Objects](#objects)')
objects.forEach(type => {
  console.log(`    * [${type.name}](#${type.name.toLowerCase()})`)
})
console.log('  * [Enums](#enums)')
enums.forEach(type => {
  console.log(`    * [${type.name}](#${type.name.toLowerCase()})`)
})
console.log('  * [Scalars](#scalars)')
scalars.forEach(type => {
  console.log(`    * [${type.name}](#${type.name.toLowerCase()})`)
})
console.log('  * [Interfaces](#interfaces)')
interfaces.forEach(type => {
  console.log(`    * [${type.name}](#${type.name.toLowerCase()})`)
})
console.log('\n</details>')

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
  console.log('  <th align="left">Value</th>')
  console.log('  <th align="left">Description</th>')
  console.log('</thead><tbody>')
  type.enumValues.forEach(value => {
    console.log('  <tr>')
    console.log(`    <td valign="top"><strong>${value.name}</strong>${value.isDeprecated ? ' ⚠️' : ''}</td>`)
    console.log('    <td>')
    console.log(`      ${markdown(value.description)}`)
    if (value.isDeprecated) {
      console.log('      <br/><br/><p>⚠️ <strong>DEPRECATED</strong></p>')
      console.log(`      <blockquote>${markdown(value.deprecationReason)}</blockquote>`)
    }
    console.log('    </td>')
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
interfaces.forEach(type => renderObject(type))
