import type { RefObject } from 'react'

const scrollToElement = (ref: RefObject<HTMLElement | null>) => {
  ref.current?.scrollIntoView({ behavior: `smooth` })
}

export default scrollToElement
