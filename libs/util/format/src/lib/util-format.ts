const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
const p = new RegExp(a.split('').join('|'), 'g')

export function dropSpecialChars(str: string) {
  return str.toString().replace(p, (c) => b.charAt(a.indexOf(c)))
}

export function clearToSearch(str: string) {
  return dropSpecialChars(str)
    .replace(/[^\w\s]|_/g, '')
    .toLowerCase()
}

export const find = (str: string, q: string) => {
  return clearToSearch(str).indexOf(clearToSearch(q)) > -1
}

export function utilFormat(): string {
  return 'util-format'
}
