import type { RectType } from '@/store/state'
import calInvertPosition from '@/utils/calInvertPosition'

const updateCanvasObjectArray = (
  array: RectType[],
  payload: {
    id: string
    top: number
    left: number
  },
  isReverse: boolean,
  size: {
    width: number
    height: number
  },
  divider?: number
) => {
  const divideBy = divider || 1

  return array.map((rect) => {
    if (rect.id === payload.id) {
      return {
        ...rect,
        top: payload.top / divideBy,
        left: isReverse
          ? calInvertPosition(size.width, payload.left / divideBy)
          : payload.left / divideBy
      }
    }
    return rect
  })
}

export default updateCanvasObjectArray
