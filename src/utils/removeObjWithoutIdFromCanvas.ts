import type { CustomRectI } from '@/types/fabric.types'
import { fabric } from 'fabric'

const removeObjWithoutIdFromCanvas = (canvas: fabric.Canvas) => {
  const obj = canvas.getObjects() as CustomRectI[]

  // get objects that have key id
  const objWihId = obj.filter((o) => o.id)

  canvas.remove(...objWihId)
}

export default removeObjWithoutIdFromCanvas
