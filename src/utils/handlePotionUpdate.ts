// const handlePotionUpdate = (obj: { id: string; top: number; left: number }) => {
//   const canva = store.state.canvas.find((c) => c.id === 'front')
//   const objCanvas = canva?.canva?.getObjects()

//   if (!objCanvas) return

//   const customObj = objCanvas as CustomRectI[]
//   const objCanvasFilter = customObj.find((o) => o.id === obj.id)

//   if (!objCanvasFilter) return

//   objCanvasFilter.set({
//     top: obj.top,
//     left: obj.left
//   })

//   store.commit(MutationEnum.UPDATE_RECT_POSITION, {
//     id: obj.id,
//     top: obj.top || 0,
//     left: obj.left || 0
//   })

//   canva?.canva?.renderAll()
// }
