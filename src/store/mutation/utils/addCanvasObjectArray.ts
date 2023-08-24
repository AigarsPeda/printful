import type { RectType } from '@/store/state'

const addCanvasObjectArray = (array: RectType[], payload: RectType, divider?: number) => {
  array.push({
    ...payload,
    top: payload.top / (divider || 1),
    left: payload.left / (divider || 1),
    width: payload.width / (divider || 1),
    height: payload.height / (divider || 1)
  })
}

export default addCanvasObjectArray
