import { COLORS } from '@/hardcoded'
import { MutationEnum } from '@/store/mutation/mutation.types'
import type { StoreType } from '@/store/store'

const handleAddObjToCanvas = (store: StoreType, id: string) => {
  store.commit(MutationEnum.ADD_RECT, {
    id,
    top: 230,
    left: 120,
    width: 50,
    height: 50,
    fill: COLORS[Math.floor(Math.random() * COLORS.length)]
  })
}

export default handleAddObjToCanvas
