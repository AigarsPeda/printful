import { type MutationsType } from '@/store/mutation/mutation.types'
import { type State } from '@/store/state'
import { type ActionContext } from 'vuex'

type AugmentedActionContextType = {
  commit<K extends keyof MutationsType>(
    key: K,
    payload: Parameters<MutationsType[K]>[1]
  ): ReturnType<MutationsType[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export enum ActionEnum {
  INC_COUNTER = 'SET_COUNTER'
}

export interface ActionsType {
  [ActionEnum.INC_COUNTER]({ commit }: AugmentedActionContextType, payload: number): void
}
