export type RectType = {
  id: string
  top: number
  fill: string
  left: number
  width: number
  height: number
}

//declare state
export type State = { counter: number; name: string; canvasObject: RectType[] }

//set state
export const state: State = {
  counter: 0,
  name: 'John Doe',
  canvasObject: [
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
  ]
}
