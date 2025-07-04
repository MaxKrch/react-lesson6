import type { Watch } from '../../types'

type WatchListProps = {
  watches: Watch[]
  onRemoveWatch: (id: Watch[`id`]) => void
}

export type { WatchListProps }
