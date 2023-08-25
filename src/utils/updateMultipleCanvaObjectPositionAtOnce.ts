import { MutationEnum } from '@/store/mutation/mutation.types'
import type { StoreType } from '@/store/store'
import type { CustomRectI } from '@/types/fabric.types'
import { fabric } from 'fabric'

const updateMultipleCanvaObjectPositionAtOnce = (canvas: fabric.Canvas, store: StoreType) => {
  let selectedObjIds: string[] = []

  canvas.on('selection:created', (selectedObj) => {
    const objArray = selectedObj.selected as CustomRectI[] | []
    selectedObjIds = objArray?.map((item) => item.id)
  })

  canvas.on('object:modified', (selectedObj) => {
    console.log('object:modified', selectedObj)

    const lastTop = selectedObj.target?.top || 0
    const lastLeft = selectedObj.target?.left || 0

    const originalTop = selectedObj.transform?.original.top || 0
    const originalLeft = selectedObj.transform?.original.left || 0

    const movedTop = lastTop - originalTop
    const movedLeft = lastLeft - originalLeft

    store.commit(MutationEnum.UPDATE_MULTIPLE_RECT_POSITION, {
      ids: selectedObjIds,
      top: movedTop,
      left: movedLeft
    })
  })
}

export default updateMultipleCanvaObjectPositionAtOnce
