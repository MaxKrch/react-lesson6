import type { Watch } from '../../../types'

type WatchItemProps = {
  watch: Watch
  onRemove: (id: Watch[`id`]) => void
}

export type { WatchItemProps }
