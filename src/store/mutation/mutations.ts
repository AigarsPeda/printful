import { MutationEnum, type MutationsType } from '@/store/mutation/mutation.types'
import addCanvasObjectArray from '@/store/mutation/utils/addCanvasObjectArray'
import updateCanvasObjectArray from '@/store/mutation/utils/updateCanvasObjectArray'
import type { RectType, StateType } from '@/store/state'
import type { MutationTree } from 'vuex'

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
    state.canvasObject.front = updateCanvasObjectArray(state.canvasObject.front, payload)
    state.canvasObject.back = updateCanvasObjectArray(state.canvasObject.back, payload, 2)
    state.canvasObject.sideL = updateCanvasObjectArray(state.canvasObject.sideL, payload, 4)
    state.canvasObject.sideR = updateCanvasObjectArray(state.canvasObject.sideR, payload, 4)
  },
  [MutationEnum.SAVE_CANVAS](state: StateType, payload: { canvas: fabric.Canvas; id: string }) {
    state.canvas.push({
      canva: payload.canvas,
      id: payload.id
    })
  },
  [MutationEnum.SAVE_BOUNDING_BOX](
    state: StateType,
    payload: { boundingBox: fabric.Rect; id: string }
  ) {
    state.boundingBoxes.push({
      boundingBox: payload.boundingBox,
      id: payload.id
    })
  }
}

export default mutations
