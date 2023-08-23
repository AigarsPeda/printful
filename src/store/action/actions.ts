import { ActionEnum, type ActionsType } from '@/store/action/action.types'
import { MutationEnum } from '@/store/mutation/mutation.types'
import type { State } from '@/store/state'
import type { ActionTree } from 'vuex'

const actions: ActionTree<State, State> & ActionsType = {
  [ActionEnum.INC_COUNTER]({ commit }, payload: number) {
    commit(MutationEnum.INC_COUNTER, payload)
  }
}

export default actions
