export function compareName(lhs: string, rhs: string) {
  let diffs = 0

  const lhsWords = lhs.toLowerCase().split(' ')
  const rhsWords = rhs.toLowerCase().split(' ')

  console.log(lhsWords)
  console.log(rhsWords)

  for (let i = 0; i < Math.max(lhsWords.length, rhsWords.length); i++) {
    diffs = diffs + compareWord(lhsWords[i], rhsWords[i])
  }

  return diffs
}

function compareWord(lhs: string, rhs: string) {

  if (!lhs) {
    return rhs.length
  }
  if (!rhs) {
    return lhs.length
  }

  let diffs = 0

  for (let i = 0; i < Math.max(lhs.length || 0, rhs.length || 0); i++) {
    if (lhs[i] !== rhs[i]) {
      diffs = diffs + 1
    }
  }
  return diffs
}

