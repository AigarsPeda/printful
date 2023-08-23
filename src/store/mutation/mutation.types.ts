import type { RectType, State } from '@/store/state'

export enum MutationEnum {
  ADD_RECT = 'ADD_RECT',
  INC_COUNTER = 'SET_COUNTER',
  UPDATE_NAME = 'UPDATE_NAME'
}

//Mutation Types
export type MutationsType<S = State> = {
  [MutationEnum.INC_COUNTER](state: S, payload: number): void
  [MutationEnum.UPDATE_NAME](state: S, payload: string): void
  [MutationEnum.ADD_RECT](state: S, payload: RectType): void
}
