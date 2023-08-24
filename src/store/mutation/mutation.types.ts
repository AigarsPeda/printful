import type { RectType, StateType } from '@/store/state'
import { fabric } from 'fabric'

export enum MutationEnum {
  ADD_RECT = 'ADD_RECT',
  UPDATE_RECT_POSITION = 'UPDATE_RECT_POSITION',
  SAVE_CANVAS = 'SAVE_CANVAS',
  SAVE_BOUNDING_BOX = 'SAVE_BOUNDING_BOX'
}

//Mutation Types
export type MutationsType<S = StateType> = {
  [MutationEnum.ADD_RECT](state: S, payload: RectType): void
  [MutationEnum.UPDATE_RECT_POSITION](
    state: S,
    payload: { id: string; top: number; left: number }
  ): void
  [MutationEnum.SAVE_CANVAS](
    state: S,
    payload: {
      canvas: fabric.Canvas
      id: string
    }
  ): void
  [MutationEnum.SAVE_BOUNDING_BOX](
    state: S,
    payload: {
      boundingBox: fabric.Rect
      id: string
    }
  ): void
}
