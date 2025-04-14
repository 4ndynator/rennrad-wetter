export enum Direction {
  NORTH = '⬆️ North',
  WEST = '⬅️ West',
  NORTH_WEST = '↖️ North-West',
  SOUTH = '⬇️ South',
  SOUTH_WEST = '↙️ South-West',
  EAST = '➡️ East',
  SOUTH_EAST = '↘️ South-East',
  NORTH_EAST = '↗️ North-East',
}

export function getWindDirection(degree: number): Direction {
  if (degree >= 337.5 || degree < 22.5) return Direction.NORTH
  if (degree >= 22.5 && degree < 67.5) return Direction.NORTH_EAST
  if (degree >= 67.5 && degree < 112.5) return Direction.EAST
  if (degree >= 112.5 && degree < 157.5) return Direction.SOUTH_EAST
  if (degree >= 157.5 && degree < 202.5) return Direction.SOUTH
  if (degree >= 202.5 && degree < 247.5) return Direction.SOUTH_WEST
  if (degree >= 247.5 && degree < 292.5) return Direction.WEST
  if (degree >= 292.5 && degree < 337.5) return Direction.NORTH_WEST

  throw new Error('Invalid wind direction degree')
}
