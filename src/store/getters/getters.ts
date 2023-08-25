import type { GettersType } from '@/store/getters/getters.types'
import { type StateType } from '@/store/state'
import { type GetterTree } from 'vuex'

const getters: GetterTree<StateType, StateType> & GettersType = {
  getLengthCanvasObject: (state) => {
    return state.canvasObject.front.length
  },
  getMainCanvasDimensions: (state) => {
    return state.mainCanvasDimensions
  },
  getFrontCanva: (state) => {
    return state.canvasObject.front
  }
}

export default getters
