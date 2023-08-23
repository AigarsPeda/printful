import { type State } from '@/store/state'

export type GettersType = {
  doubleCounter(state: State): number
  getLengthCanvasObject(state: State): number
}
