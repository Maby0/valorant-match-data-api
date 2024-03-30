import { MapWinrateData } from '../../types/query-types/major/map-winrate-data'

export const calculateWinratePercentage = (
  mapWinrateData: MapWinrateData[]
) => {
  let count = 0
  for (const item of mapWinrateData) {
    if (item.playerHasWon) count++
  }
  return (count / mapWinrateData.length) * 100
}
