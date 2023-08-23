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
      fill: 'blue',
      left: 0,
      top: 0,
      id: '1'
    },
    {
      width: 50,
      height: 50,
      fill: 'red',
      left: 60,
      top: 60,
      id: '2'
    }
  ]
}
