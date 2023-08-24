import { MutationEnum, type MutationsType } from '@/store/mutation/mutation.types'
import type { RectType, State } from '@/store/state'
import type { MutationTree } from 'vuex'

const mutations: MutationTree<State> & MutationsType = {
  [MutationEnum.INC_COUNTER](state: State, payload: number) {
    state.counter += payload
  },
  [MutationEnum.UPDATE_NAME](state: State, payload: string) {
    state.name = payload
  },
  [MutationEnum.ADD_RECT](state: State, payload: RectType) {
    state.canvasObject.push(payload)
  },
  [MutationEnum.UPDATE_RECT_POSITION](
    state: State,
    payload: { id: string; top: number; left: number }
  ) {
    state.canvasObject = state.canvasObject.map((rect) => {
      if (rect.id === payload.id) {
        return {
          ...rect,
          top: payload.top,
          left: payload.left
        }
      }
      return rect
    })
  }
}

export default mutations
