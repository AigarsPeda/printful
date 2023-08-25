interface Dimensions {
  width: number
  height: number
}

function calculateSizeRatio(first: Dimensions, second: Dimensions): number {
  const widthRatio = Math.max(first.width / second.width, second.width / first.width)
  const heightRatio = Math.max(first.height / second.height, second.height / first.height)

  return Math.max(widthRatio, heightRatio)
}

export default calculateSizeRatio
