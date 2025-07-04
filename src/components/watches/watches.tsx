import { useCallback, useState } from 'react'
import WatchList from '../watch-list'
import type { Watch } from '../../types'
import WatchForm from '../watch-form'

const Watches = () => {
  const [watches, setWatches] = useState<Watch[]>([])
  const handleAddWatch = useCallback((watch: Watch) => {
    setWatches((prev) => [...prev, watch])
  }, [])

  const handleRemoveWatch = useCallback((id: Watch[`id`]) => {
    setWatches((prev) => prev.filter((watch) => watch.id !== id))
  }, [])
  return (
    <div className="max-w-[1200px] min-w-[300px] w-[90%] min-h-[100vh] m-auto p-3 bg-[#EFEFEF]">
      <WatchForm onAddWatch={handleAddWatch} />
      <WatchList watches={watches} onRemoveWatch={handleRemoveWatch} />
    </div>
  )
}

export default Watches
