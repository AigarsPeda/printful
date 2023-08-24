import { type MutationsType } from '@/store/mutation/mutation.types'
import { type StateType } from '@/store/state'
import { type ActionContext } from 'vuex'

type AugmentedActionContextType = {
  commit<K extends keyof MutationsType>(
    key: K,
    payload: Parameters<MutationsType[K]>[1]
  ): ReturnType<MutationsType[K]>
} & Omit<ActionContext<StateType, StateType>, 'commit'>

export enum ActionEnum {
  SAVE_CANVAS = 'SAVE_CANVAS'
}

export interface ActionsType {
  [ActionEnum.SAVE_CANVAS](
    { commit }: AugmentedActionContextType,
    payload: { canvas: fabric.Canvas; id: string }
  ): void
}
