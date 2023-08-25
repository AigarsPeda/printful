import { MutationEnum } from '@/store/mutation/mutation.types'
import type { StoreType } from '@/store/store'
import type { CustomRectI } from '@/types/fabric.types'
import { fabric } from 'fabric'

const updateCanvasObjScale = (canvas: fabric.Canvas, store: StoreType) => {
  let selectedObjIds: string[] = []

  canvas.on('selection:created', function (modifiedObj) {
    const objArray = modifiedObj.selected as CustomRectI[] | []
    selectedObjIds = objArray?.map((item) => item.id)
  })

  canvas.on('object:modified', function (modifiedObj) {
    if (modifiedObj.action === 'scale') {
      const scale = modifiedObj.target?.getObjectScaling()

      if (!scale) return

      store.commit(MutationEnum.UPDATE_RECT_SCALE, {
        ids: selectedObjIds,
        scaleX: Math.round(scale.scaleX * 100) / 100,
        scaleY: Math.round(scale.scaleY * 100) / 100
      })
    }

    selectedObjIds = []
  })
}

export default updateCanvasObjScale
