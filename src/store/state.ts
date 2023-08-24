export type RectType = {
  id: string
  top: number
  fill: string
  left: number
  width: number
  height: number
}

//declare state
export type State = {
  name: string
  counter: number
  canvasObject: {
    front: RectType[]
    back: RectType[]
  }
}

//set state
export const state: State = {
  counter: 0,
  name: 'John Doe',
  canvasObject: {
    front: [
      {
        width: 50,
        height: 50,
        fill: '#7c3aed',
        left: 135,
        top: 170,
        id: '1'
      },
      {
        width: 50,
        height: 50,
        fill: '#db2777',
        left: 160,
        top: 200,
        id: '2'
      }
    ],
    back: [
      {
        width: 25,
        height: 25,
        fill: '#7c3aed',
        left: 67,
        top: 85,
        id: '1'
      },
      {
        width: 25,
        height: 25,
        fill: '#db2777',
        left: 80,
        top: 100,
        id: '2'
      }
    ]
  }
}
