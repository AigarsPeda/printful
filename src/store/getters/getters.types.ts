import { type StateType } from '@/store/state'

export type GettersType = {
  getLengthCanvasObject(state: StateType): number
  getMainCanvasDimensions(state: StateType): { width: number; height: number }
}
