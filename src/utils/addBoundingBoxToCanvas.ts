import { fabric } from 'fabric'

type BoundingOptionsType = {
  top?: number
  left?: number
  width?: number
  height?: number
  stroke?: string
}

const addBoundingBoxToCanvas = (canvas: fabric.Canvas, options?: BoundingOptionsType) => {
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

  canvas.add(boundingBox)

  canvas.on('object:moving', function (movingObj) {
    if (!movingObj.target) return

    const topBound = boundingBox.top || 0
    const leftBound = boundingBox.left || 0
    const rightBound = leftBound + (boundingBox.width || 0)
    const bottomBound = topBound + (boundingBox.height || 0)

    const movingObjTop = movingObj.target?.top || 0
    const movingObjLeft = movingObj.target?.left || 0
    const movingObjWidth = movingObj.target?.width || 0
    const movingObjHeight = movingObj.target?.height || 0
    const movingObjRight = movingObjLeft + (movingObj.target?.width || 0)
    const movingObjBottom = movingObjTop + (movingObj.target?.height || 0)

    if (movingObjLeft < leftBound) {
      movingObj.target.left = leftBound
    }

    if (movingObjTop < topBound) {
      movingObj.target.top = topBound
    }

    if (movingObjRight > rightBound) {
      movingObj.target.left = rightBound - movingObjWidth
    }

    if (movingObjBottom > bottomBound) {
      movingObj.target.top = bottomBound - movingObjHeight
    }
  })
}

export default addBoundingBoxToCanvas
