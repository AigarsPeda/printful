import { type ActionsType } from '@/store/action/action.types'
import actions from '@/store/action/actions'
import getters from '@/store/getters/getters'
import type { GettersType } from '@/store/getters/getters.types'
import { type MutationsType } from '@/store/mutation/mutation.types'
import mutations from '@/store/mutation/mutations'
import { state, type StateType } from '@/store/state'
import {
  createLogger,
  createStore,
  Store as VuexStore,
  type CommitOptions,
  type DispatchOptions
} from 'vuex'

//setup store type
export type StoreType = Omit<VuexStore<StateType>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof MutationsType, P extends Parameters<MutationsType[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<MutationsType[K]>
} & {
  getters: {
    [K in keyof GettersType]: ReturnType<GettersType[K]>
  }
} & {
  dispatch<K extends keyof ActionsType>(
    key: K,
    payload: Parameters<ActionsType[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsType[K]>
}

export const store = createStore({
  state,
  actions,
  getters,
  mutations,
  plugins: [createLogger()]
})

export function useStore() {
  return store as StoreType
}
