import type { GettersType } from '@/store/getters/getters.types'
import { type State } from '@/store/state'
import { type GetterTree } from 'vuex'

const getters: GetterTree<State, State> & GettersType = {
  doubleCounter: (state) => {
    return state.counter * 2
  },
  getLengthCanvasObject: (state) => {
    return state.canvasObject.length
  }
}

export default getters
