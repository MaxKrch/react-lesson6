import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import WatchItem from './watch-item'
import { vi } from 'vitest'

describe('Component: WatchItem', () => {
  const mockWatch = {
    id: '1',
    title: 'Test Watch',
    timeZone: 3,
  }

  it('should render title and clock hands', () => {
    render(<WatchItem watch={mockWatch} onRemove={vi.fn()} />)

    expect(screen.getByText(mockWatch.title)).toBeInTheDocument()

    const hands = screen
      .getAllByText('', { selector: 'span' })
      .filter((el) => el.style.transform.includes('rotate'))
    expect(hands.length).toBe(3)
  })

  it('should calls onRemove when close button is clicked', async () => {
    const onRemove = vi.fn()
    render(<WatchItem watch={mockWatch} onRemove={onRemove} />)

    await userEvent.click(screen.getByText('✗'))
    expect(onRemove).toHaveBeenCalledWith('1')
  })
})
