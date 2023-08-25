import { MAIN_CANVAS, PINK, PURPLE } from '@/hardcoded'
import calInvertPosition from '@/utils/calInvertPosition'
import { fabric } from 'fabric'

export type RectType = {
  id: string
  top: number
  fill: string
  left: number
  width: number
  height: number
}

//declare state
export type StateType = {
  mainCanvasDimensions: {
    width: number
    height: number
  }
  canvas: {
    canva: fabric.Canvas | null
    id: string | null
    isReverse: boolean
  }[]
  boundingBoxes: {
    boundingBox: fabric.Rect | null
    id: string | null
  }[]
  canvasObject: {
    back: RectType[]
    front: RectType[]
    sideL: RectType[]
    sideR: RectType[]
  }
}

//set state
export const state: StateType = {
  canvas: [],
  mainCanvasDimensions: {
    width: MAIN_CANVAS.width,
    height: MAIN_CANVAS.height
  },
  boundingBoxes: [],
  canvasObject: {
    front: [
      {
        id: '1',
        width: 50,
        height: 50,
        fill: '#7c3aed',
        top: PURPLE.top,
        left: PURPLE.left
      },
      {
        id: '2',
        width: 50,
        height: 50,
        fill: '#db2777',
        top: PINK.top,
        left: PINK.left
      }
    ],
    back: [
      {
        id: '1',
        width: 25,
        height: 25,
        fill: '#7c3aed',
        top: PURPLE.top / 2,
        left: PURPLE.left / 2
      },
      {
        id: '2',
        width: 25,
        height: 25,
        fill: '#db2777',
        top: PINK.top / 2,
        left: PINK.left / 2
      }
    ],
    sideL: [
      {
        id: '1',
        width: 15,
        height: 15,
        fill: '#7c3aed',
        top: PURPLE.top / 4,
        left: PURPLE.left / 4
      },
      {
        id: '2',
        width: 15,
        height: 15,
        fill: '#db2777',
        top: PINK.top / 4,
        left: PINK.left / 4
      }
    ],
    sideR: [
      {
        id: '1',
        width: 15,
        height: 15,
        fill: '#7c3aed',
        top: PURPLE.top / 4,
        left: calInvertPosition(MAIN_CANVAS.width / 4, PURPLE.left / 4)
      },
      {
        id: '2',
        width: 15,
        height: 15,
        fill: '#db2777',
        top: PINK.top / 4,
        left: calInvertPosition(MAIN_CANVAS.width / 4, PINK.left / 4)
      }
    ]
  }
}
