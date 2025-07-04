import WatchItem from './watch-item'
import type { WatchListProps } from './watch-list.type'

const WatchList = ({ watches, onRemoveWatch }: WatchListProps) => {
  return (
    <ul className="flex flex-wrap gap-10 p-4">
      {watches.map((watch) => (
        <li key={watch.id}>
          <WatchItem watch={watch} onRemove={onRemoveWatch} />
        </li>
      ))}
    </ul>
  )
}

export default WatchList
