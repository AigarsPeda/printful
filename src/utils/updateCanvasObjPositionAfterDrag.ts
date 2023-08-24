import { fabric } from 'fabric'
import { MutationEnum } from '../store/mutation/mutation.types'
import { store } from '../store/store'
import type { CustomRectI } from '../types/fabric.types'

const updateCanvasObjPositionAfterDrag = (canvas: fabric.Canvas) => {
  canvas.on('object:modified', function (modifiedObj) {
    const obj = modifiedObj.target as CustomRectI

    store.commit(MutationEnum.UPDATE_RECT_POSITION, {
      id: obj.id,
      top: obj.top || 0,
      left: obj.left || 0
    })
  })
}

export default updateCanvasObjPositionAfterDrag
