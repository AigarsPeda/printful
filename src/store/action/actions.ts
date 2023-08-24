import { ActionEnum, type ActionsType } from '@/store/action/action.types'
import { MutationEnum } from '@/store/mutation/mutation.types'
import type { StateType } from '@/store/state'
import type { ActionTree } from 'vuex'

const actions: ActionTree<StateType, StateType> & ActionsType = {
  [ActionEnum.SAVE_CANVAS]({ commit }, payload) {
    commit(MutationEnum.SAVE_CANVAS, payload)
  }
}

export default actions
