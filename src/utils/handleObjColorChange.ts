import { type StoreType } from '@/store/store'
import { MutationEnum } from '@/store/mutation/mutation.types'
const handleObjColorChange = (
  event: Event,
  store: StoreType,
  id: string,
  callBack?: () => void
) => {
  const target = event.target as HTMLInputElement

  store.commit(MutationEnum.UPDATE_RECK_COLOR, {
    id,
    color: target.value
  })
  callBack && callBack()
}

export default handleObjColorChange
