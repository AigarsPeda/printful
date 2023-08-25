import type { RectType, StateType } from '@/store/state'
import { fabric } from 'fabric'

export enum MutationEnum {
  ADD_RECT = 'ADD_RECT',
  UPDATE_RECT_POSITION = 'UPDATE_RECT_POSITION',
  SAVE_CANVAS = 'SAVE_CANVAS',
  SAVE_BOUNDING_BOX = 'SAVE_BOUNDING_BOX',
  UPDATE_RECT_SCALE = 'UPDATE_RECT_SCALE'
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
      id: string
      isReverse: boolean
      canvas: fabric.Canvas
    }
  ): void
  [MutationEnum.SAVE_BOUNDING_BOX](
    state: S,
    payload: {
      id: string
      boundingBox: fabric.Rect
    }
  ): void
  [MutationEnum.UPDATE_RECT_SCALE](
    state: S,
    payload: { ids: string[]; scaleX: number; scaleY: number }
  ): void
}
