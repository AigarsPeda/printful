import { MutationEnum } from '@/store/mutation/mutation.types'
import type { StoreType } from '@/store/store'

const handlePotionUpdate = (obj: { id: string; top: number; left: number }, store: StoreType) => {
  store.commit(MutationEnum.UPDATE_RECT_POSITION, {
    id: obj.id,
    top: obj.top || 0,
    left: obj.left || 0
  })
}

export default handlePotionUpdate
