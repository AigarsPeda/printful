import { MutationEnum, type MutationsType } from '@/store/mutation/mutation.types'
import type { RectType, State } from '@/store/state'
import { h } from 'vue'
import type { MutationTree } from 'vuex'

const mutations: MutationTree<State> & MutationsType = {
  [MutationEnum.INC_COUNTER](state: State, payload: number) {
    state.counter += payload
  },
  [MutationEnum.UPDATE_NAME](state: State, payload: string) {
    state.name = payload
  },
  [MutationEnum.ADD_RECT](state: State, payload: RectType) {
    state.canvasObject.front.push(payload)

    state.canvasObject.back.push({
      ...payload,
      top: payload.top / 2,
      left: payload.left / 2,
      height: payload.height / 2,
      width: payload.width / 2
    })
  },
  [MutationEnum.UPDATE_RECT_POSITION](
    state: State,
    payload: { id: string; top: number; left: number }
  ) {
    state.canvasObject.front = state.canvasObject.front.map((rect) => {
      if (rect.id === payload.id) {
        return {
          ...rect,
          top: payload.top,
          left: payload.left
        }
      }
      return rect
    })

    state.canvasObject.back = state.canvasObject.back.map((rect) => {
      if (rect.id === payload.id) {
        return {
          ...rect,
          top: payload.top / 2,
          left: payload.left / 2
        }
      }
      return rect
    })
  }
}

export default mutations
