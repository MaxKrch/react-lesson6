import { memo } from 'react'
import useWatch from '../../../hooks/use-watch'
import type { WatchItemProps } from './watch-item.type'

const WatchItem = ({ watch, onRemove }: WatchItemProps) => {
  const { hours, minutes, seconds } = useWatch(watch.timeZone)
  return (
    <article className="w-[250px] h-[300px] relative bg-[#FEFEFE] p-5 rounded shadow">
      <h3 className="p-1 text-xl text-black">{watch.title}</h3>
      <div className="w-[200px] h-[200px] rounded-full border relative flex justify-center items-center m-auto">
        <span className="block bg-black h-2 w-2 rounded-full"></span>
        <span
          className="absolute top-0 left-[50% - 5px] w-[10px] h-[50%] bg-black z-1 origin-bottom"
          style={{
            clipPath:
              'polygon(50% 100%, 30% 95%, 30% 35%, 0 40%, 50% 20%, 100% 40%, 70% 35%, 70% 95%)',
            transform: `rotate(${hours}deg)`,
          }}
        ></span>
        <span
          className="absolute top-0 left-[50% - 4px] w-[8px] h-[50%] bg-[#222222] z-2 origin-bottom"
          style={{
            clipPath:
              'polygon(50% 100%, 35% 95%, 35% 15%, 0 20%, 50% 5%, 100% 20%, 65% 15%, 65% 95%)',
            transform: `rotate(${minutes}deg)`,
          }}
        ></span>
        <span
          className="absolute top-0 left-[50% - 3px] w-[6px] h-[50%] bg-[#FF0000] z-3 border origin-bottom"
          style={{
            clipPath:
              'polygon(50% 100%, 40% 95%, 40% 10%, 0 20%, 50% 0, 100% 20%, 60% 10%, 60% 95%)',
            transform: `rotate(${seconds}deg)`,
          }}
        ></span>
      </div>
      <div
        className="w-6 h-6 rounded-full border text-[#FF5555] font-black flex justify-center align-center text-sm cursor-pointer absolute top-8 right-6 shadow-lg hover:bg-[#FAFAFA]"
        onClick={() => onRemove(watch.id)}
      >
        ✗
      </div>
    </article>
  )
}

export default memo(WatchItem)
