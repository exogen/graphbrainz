import util from 'util';
import dashify from 'dashify';
import pascalCase from 'pascalcase';

export const ONE_DAY = 24 * 60 * 60 * 1000;

export function getFields(
  info,
  fragments = info.fragments,
  depth = 0,
  prefix = ''
) {
  if (info.kind !== 'Field') {
    info = info.fieldNodes[0];
  }
  const selections = info.selectionSet.selections;
  const reducer = (fields, selection) => {
    if (selection.kind === 'FragmentSpread') {
      const name = selection.name.value;
      const fragment = fragments[name];
      if (!fragment) {
        throw new Error(`Fragment '${name}' was not passed to getFields()`);
      }
      fragment.selectionSet.selections.reduce(reducer, fields);
    } else if (selection.kind === 'InlineFragment') {
      selection.selectionSet.selections.reduce(reducer, fields);
    } else {
      const prefixedName = prefix + selection.name.value;
      fields[prefixedName] = selection;
      if (depth > 0 && selection.selectionSet) {
        const subFields = getFields(
          selection,
          fragments,
          depth - 1,
          `${prefixedName}.`
        );
        Object.assign(fields, subFields);
      }
    }
    return fields;
  };
  return selections.reduce(reducer, {});
}

export function prettyPrint(
  obj,
  { depth = 5, colors = true, breakLength = 120 } = {}
) {
  console.log(util.inspect(obj, { depth, colors, breakLength }));
}

export function toFilteredArray(obj) {
  return (Array.isArray(obj) ? obj : [obj]).filter((x) => x);
}

export function extendIncludes(includes, moreIncludes) {
  includes = toFilteredArray(includes);
  moreIncludes = toFilteredArray(moreIncludes);
  const seen = {};
  return includes.concat(moreIncludes).filter((x) => {
    if (seen[x]) {
      return false;
    }
    seen[x] = true;
    return true;
  });
}

export const toPascal = pascalCase;
export const toDashed = dashify;

export function toPlural(name) {
  return name.endsWith('s') ? name : name + 's';
}

export function toSingular(name) {
  return name.endsWith('s') && !/series/i.test(name) ? name.slice(0, -1) : name;
}

export function toWords(name) {
  return toPascal(name).replace(/([^A-Z])?([A-Z]+)/g, (match, tail, head) => {
    tail = tail ? tail + ' ' : '';
    head = head.length > 1 ? head : head.toLowerCase();
    return `${tail}${head}`;
  });
}

export function filterObjectValues(obj, filter) {
  return Object.entries(obj).reduce((obj, [key, value]) => {
    if (filter(value)) {
      obj[key] = value;
    }
    return obj;
  }, {});
}

export function getTypeName(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
