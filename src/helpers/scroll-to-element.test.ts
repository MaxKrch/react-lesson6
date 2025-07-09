import { vi } from 'vitest'
import scrollToElement from './scroll-to-element'

describe('Helper: scrollToElement', () => {
  it('should call scrollIntoView, when Element exist', () => {
    const mockElement = {
      scrollIntoView: vi.fn(),
    } as unknown as HTMLElement

    const ref = { current: mockElement }

    scrollToElement(ref)

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    })
  })

  it('should not call scrollIntoView, when Element not exist', () => {
    const ref = { current: null }

    expect(() => scrollToElement(ref)).not.toThrow()
  })
})
