import type { StateType } from '@/store/state'

const getCanvasSize = (state: StateType, id: string) => {
  const canva = state.canvas.find((c) => c.id === id)
  const canvasWidth = canva?.canva?.getWidth() || 0
  const canvasHeight = canva?.canva?.getHeight() || 0

  return {
    width: canvasWidth,
    height: canvasHeight
  }
}

export default getCanvasSize
