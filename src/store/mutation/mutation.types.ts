import type { RectType, State } from '@/store/state'

export enum MutationEnum {
  ADD_RECT = 'ADD_RECT',
  UPDATE_RECT_POSITION = 'UPDATE_RECT_POSITION',
  INC_COUNTER = 'SET_COUNTER',
  UPDATE_NAME = 'UPDATE_NAME'
}

//Mutation Types
export type MutationsType<S = State> = {
  [MutationEnum.INC_COUNTER](state: S, payload: number): void
  [MutationEnum.UPDATE_NAME](state: S, payload: string): void
  [MutationEnum.ADD_RECT](state: S, payload: RectType): void
  [MutationEnum.UPDATE_RECT_POSITION](
    state: S,
    payload: { id: string; top: number; left: number }
  ): void
}
