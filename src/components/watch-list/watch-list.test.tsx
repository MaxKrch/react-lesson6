import { render, screen } from '@testing-library/react'
import WatchList from './watch-list'
import { vi } from 'vitest'

const watches = [
  { id: '1', title: 'Watch 1', timeZone: 0 },
  { id: '2', title: 'Watch 2', timeZone: 3 },
]

describe('Component: WatchList', () => {
  it('shouls renders list of watches', () => {
    render(<WatchList watches={watches} onRemoveWatch={vi.fn()} />)

    expect(screen.getByText(watches[0].title)).toBeInTheDocument()
    expect(screen.getByText(watches[1].title)).toBeInTheDocument()
  })

  it('should renders correct number of items', () => {
    render(<WatchList watches={watches} onRemoveWatch={vi.fn()} />)

    expect(screen.getAllByRole('listitem').length).toBe(watches.length)
  })
})
