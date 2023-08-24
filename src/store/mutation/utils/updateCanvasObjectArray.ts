import type { RectType } from '@/store/state'

const updateCanvasObjectArray = (
  array: RectType[],
  payload: {
    id: string
    top: number
    left: number
  },
  divider?: number
) => {
  return array.map((rect) => {
    if (rect.id === payload.id) {
      return {
        ...rect,
        top: payload.top / (divider || 1),
        left: payload.left / (divider || 1)
      }
    }
    return rect
  })
}

export default updateCanvasObjectArray
