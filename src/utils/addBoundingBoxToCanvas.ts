import { fabric } from 'fabric'

type BoundingOptionsType = {
  top?: number
  left?: number
  width?: number
  height?: number
  stroke?: string
}

const addBoundingBoxToCanvas = (
  canvas: fabric.Canvas,
  isCenter = false,
  options?: BoundingOptionsType
) => {
  const boundingBox = new fabric.Rect({
    fill: 'none',
    evented: false,
    hasBorders: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    top: options?.top || 135,
    left: options?.left || 98,
    width: options?.width || 150,
    height: options?.height || 200,
    backgroundColor: 'transparent',
    stroke: options?.stroke || 'red'
  })

  // position bounding in the center of the canvas
  if (isCenter && canvas && boundingBox.height && boundingBox.width) {
    boundingBox.set({
      top: canvas.getHeight() / 2 - boundingBox.height / 2,
      left: canvas.getWidth() / 2 - boundingBox.width / 2
    })
  }

  canvas.add(boundingBox)

  return boundingBox
}

export default addBoundingBoxToCanvas
