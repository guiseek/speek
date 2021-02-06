export type Grouped<T> = { group: string; children: T[] }

export function groupByLetter<T>(data: T[], prop: keyof T) {
  return Object.values(
    data.reduce((r, e) => {
      // get first letter of name of current element
      let group = e[prop][0]
      // if there is no property in accumulator with this letter create it
      if (!r[group]) r[group] = { group, children: [e] }
      // if there is push current element to children array for that letter
      else r[group].children.push(e)
      // return accumulator
      return r
    }, {})
  ) as Grouped<T>[]
}
