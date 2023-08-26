import type { RectType, StateType } from '@/store/state'
import { fabric } from 'fabric'

export enum MutationEnum {
  ADD_RECT = 'ADD_RECT',
  SAVE_CANVAS = 'SAVE_CANVAS',
  SAVE_BOUNDING_BOX = 'SAVE_BOUNDING_BOX',
  UPDATE_RECT_SCALE = 'UPDATE_RECT_SCALE',
  UPDATE_RECK_COLOR = 'UPDATE_RECK_COLOR',
  UPDATE_RECT_POSITION = 'UPDATE_RECT_POSITION'
}

//Mutation Types
export type MutationsType<S = StateType> = {
  [MutationEnum.ADD_RECT](state: S, payload: RectType): void
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
  [MutationEnum.UPDATE_RECT_POSITION](
    state: S,
    payload: { ids: string[]; top: number; left: number }
  ): void
  [MutationEnum.UPDATE_RECK_COLOR](state: S, payload: { id: string; color: string }): void
}
