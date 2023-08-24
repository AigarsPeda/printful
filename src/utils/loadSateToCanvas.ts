import type { RectType } from '@/store/state'
import type { CustomRectI } from '@/types/fabric.types'
import { fabric } from 'fabric'

const loadSateToCanvas = (canvas: fabric.Canvas, canvasObject: RectType[], isDraggable = true) => {
  canvasObject.forEach((rect) => {
    const r = new fabric.Rect(rect) as CustomRectI
    r.set('id', rect.id)

    if (!isDraggable) {
      r.set({
        evented: false,
        hasBorders: false,
        selectable: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true
      })
    }

    canvas.add(r)
    canvas.renderAll()
  })
}

export default loadSateToCanvas
