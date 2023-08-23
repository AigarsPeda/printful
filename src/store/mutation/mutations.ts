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
  }
}

export default mutations
