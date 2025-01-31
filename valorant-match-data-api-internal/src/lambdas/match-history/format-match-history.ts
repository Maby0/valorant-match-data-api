import { MatchHistoryData } from '../../types/query-types/major/match-history-data'
import stringTable from 'string-table'
import { formatDate } from '../../util/format-date'

export const formatMatchHistory = (
  mapToQuery: string,
  mapMatchHistoryData: MatchHistoryData[]
) => {
  const rows = []
  for (const matchHistoryData of mapMatchHistoryData) {
    const teamComp = matchHistoryData.playerTeamData
      .map((playerData) => playerData.playerCharacter)
      .sort()
      .join(', ')
    rows.push({
      'Game Start': formatDate(new Date(matchHistoryData.gameStart * 1000)),
      'Win?': matchHistoryData.playerHasWon,
      'Rounds Won': matchHistoryData.playerRoundsWon,
      'Rounds Lost': matchHistoryData.playerRoundsLost,
      'Agents Played': teamComp
    })
  }
  return `**Match history for ${mapToQuery}**\n\`\`\`${stringTable.create(rows)}\`\`\``
}
