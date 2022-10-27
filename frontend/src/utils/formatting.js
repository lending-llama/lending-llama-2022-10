export const formatRate = (rawRate) => {
  if (rawRate === undefined) {
    return ""
  }
  return rawRate.toFixed(2) +"%"
}
