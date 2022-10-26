export function formatRate (rate) {
  if(rate === undefined) {
    return "unbekannt"
  }
  return rate.toFixed(2) + "%"
}
