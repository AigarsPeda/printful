import { MutationEnum, type MutationsType } from '@/store/mutation/mutation.types'
import addCanvasObjectArray from '@/store/mutation/utils/addCanvasObjectArray'
import getCanvasSize from '@/store/mutation/utils/getCanvasSize'
import updateCanvasObjectArray from '@/store/mutation/utils/updateCanvasObjectArray'
import type { RectType, StateType } from '@/store/state'
import type { MutationTree } from 'vuex'
import calculateSizeRatio from '@/utils/calculateSizeRatio'

const mutations: MutationTree<StateType> & MutationsType = {
  [MutationEnum.ADD_RECT](state: StateType, payload: RectType) {
    addCanvasObjectArray(state.canvasObject.front, payload)
    addCanvasObjectArray(state.canvasObject.back, payload, 2)
    addCanvasObjectArray(state.canvasObject.sideL, payload, 4)
    addCanvasObjectArray(state.canvasObject.sideR, payload, 4)
  },
  [MutationEnum.UPDATE_RECT_POSITION](
    state: StateType,
    payload: { id: string; top: number; left: number }
  ) {
    for (const key of state.canvas) {
      const id = key.id as keyof StateType['canvasObject']
      const isReverse = key.isReverse
      const size = getCanvasSize(state, id)

      state.canvasObject[id] = updateCanvasObjectArray(
        state.canvasObject[id],
        payload,
        isReverse,
        size,
        calculateSizeRatio(state.mainCanvasDimensions, size)
      )
    }
  },
  [MutationEnum.SAVE_CANVAS](
    state: StateType,
    payload: { canvas: fabric.Canvas; id: string; isReverse: boolean }
  ) {
    state.canvas.push({
      id: payload.id,
      canva: payload.canvas,
      isReverse: payload.isReverse
    })
  },
  [MutationEnum.SAVE_BOUNDING_BOX](
    state: StateType,
    payload: { boundingBox: fabric.Rect; id: string }
  ) {
    state.boundingBoxes.push({
      id: payload.id,
      boundingBox: payload.boundingBox
    })
  }
}

export default mutations
